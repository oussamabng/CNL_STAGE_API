const Dossier = require("../models").Dossier;
const Postulant = require("../models").Postulant;
const Liste = require("../models").Liste;
const Transmition = require("../models").Transmition;
const Project = require("../models").Project;
const db = require("../models/index");
const Op = db.Sequelize.Op;
const { checkAuth } = require("../middlewares/checkAuth");
const { getPagingData,getPagination } = require("../middlewares/pagination");
const order = require("../middlewares/order");

exports.create = async(req,res)=>{
    checkAuth(req,res);
    try {
        if(!req.body){
            return res.status(404).send({
                message:"data required"
            })
        }
        const dossier = await Dossier.build(req.body);
        await dossier.save();
        return res.status(201).send(dossier);
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
}

exports.findOne = async(req,res)=>{
    try {
        checkAuth(req,res);
        const {id} = req.params;
        const dossier = await Dossier.findByPk(id);
        if (!dossier){
            return res.status(404).send({
                message:"dossier dont exist"
            })
        }
        return res.status(200).send(dossier);
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
}

exports.findAll = async(req,res)=>{
    const { page, size,search,ordering } = req.query;
    const { limit, offset } = getPagination(page, size);
    const condition = search ? {
        [Op.or]: [
          {
            '$Postulant.first_name$':{ [Op.like]: `%${search}%` }
          },
          {
            '$Postulant.last_name$':{ [Op.like]: `%${search}%` }
          },
          {
            '$Liste.ref$':{ [Op.like]: `%${search}%` }
          },
          ,
          {
            '$Postulant.place_of_birth$':{ [Op.like]: `%${search}%` }
          },
        ]
      } : {}
    checkAuth(req,res);
    Dossier.findAndCountAll({offset,limit,where:condition,order:order(ordering),include:[Postulant,Liste]})
    .then(data=>{   
        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving dossiers."
          });
    })
}


exports.update = async(req,res)=>{
    const {id} = req.params;
    checkAuth(req,res);
    const dossier = await Dossier.update(req.body,{where:{id},returning:true});
    return res.status(200).send(dossier);
}

exports.delete = async(req,res)=>{
    const {id} = req.params;
        checkAuth(req,res);
        await Dossier.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"dossier deleted"});
}

exports.getForAgent = async(req,res)=>{
    try {
        const { AgentId } = req.params;
        const { page, size,search,ordering } = req.query;
        const { limit, offset } = getPagination(page, size);
        checkAuth(req,res);
        const condition = {
            'AgentId': AgentId
        }
        let dossierIds = [];
        const searchText = search ? search : "";
        const transmitionsAgent = await Transmition.findAll({where:condition,attributes:["DossierId"]});
        transmitionsAgent.map((t)=>
            dossierIds.push(t.DossierId)
            )
        const conditionDossier = {
            id : {
                [Op.in]: dossierIds
            },
            [Op.or]: [
                {
                  '$Postulant.first_name$':{ [Op.like]: `%${searchText}%` }
                },
                {
                  '$Postulant.last_name$':{ [Op.like]: `%${searchText}%` }
                },
                {
                  '$Liste.ref$':{ [Op.like]: `%${searchText}%` }
                },
                ,
                {
                  '$Postulant.place_of_birth$':{ [Op.like]: `%${searchText}%` }
                },
              ]
        }
        
         Dossier.findAndCountAll({limit,offset,where:conditionDossier,order:order(ordering),include:[Postulant,Liste]})
            .then(data=>{
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving dossiers."
              });
        })
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while retrieving dossiers."
          });
    }
}