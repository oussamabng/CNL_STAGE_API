const Transmition = require("../models").Transmition;
const Agent = require("../models").Agent;
const Dossier = require("../models").Dossier;

const db = require("../models/index");
const Op = db.Sequelize.Op;
const {checkAuth} = require("../middlewares/checkAuth");
const Order = require("../middlewares/order");

const { getPagingData,getPagination } = require("../middlewares/pagination");

exports.create = async(req,res)=>{
    try {
        checkAuth(req,res);
        const transmition = await Transmition.build(req.body);
        await transmition.save();
        return res.status(201).send(transmition);
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
}

exports.findOne = async(req,res)=>{
    const {id} = req.params;
    checkAuth(req,res);
    const postulant = await Transmition.findOne({where:{id}});
    return res.status(200).send(postulant);
}

exports.findAll = async(req,res)=>{
    const { page, size,ordering,DossierId} = req.query;
    const { limit, offset } = getPagination(page, size);
    const condition = DossierId ? {
        '$Dossier.id$': DossierId
      } : null;
    

    checkAuth(req,res);
    Transmition.findAndCountAll({offset,limit,include:[Agent,Dossier],attributes:{exclude:["AgentId","DossierId"]},where:condition,order:Order(ordering)})
    .then(data=>{   
        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving postulants."
          });
    })
}

exports.update = async(req,res)=>{
    const {id} = req.params;
    checkAuth(req,res);
    const transmition = await Transmition.update(req.body,{where:{id},returning:true});
    return res.status(200).send(transmition);
}

exports.delete = async(req,res)=>{
    const {id} = req.params;
        checkAuth(req,res);
        await Transmition.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"transmition deleted"});
}