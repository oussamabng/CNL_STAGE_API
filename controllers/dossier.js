const Dossier = require("../models").Dossier;
const db = require("../models/index");
const Op = db.Sequelize.Op;
const { checkAuth } = require("../middlewares/checkAuth");
const { getPagingData,getPagination } = require("../middlewares/pagination");

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
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    checkAuth(req,res);
    Dossier.findAndCountAll({offset,limit})
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