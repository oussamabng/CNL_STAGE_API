const Conjoint = require("../models").Conjoint;
const Postulant = require("../models").Postulant;

const db = require("../models/index");
const Op = db.Sequelize.Op;
const {checkAuth} = require("../middlewares/checkAuth");

const { getPagingData,getPagination } = require("../middlewares/pagination");

exports.create = async(req,res)=>{
    try {
        checkAuth(req,res);
        const conjoint = await Conjoint.build(req.body);
        await conjoint.save();
        return res.status(201).send(conjoint);
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
    const conjoint = await Conjoint.findOne({where:{id}});
    return res.status(200).send(conjoint);
}

exports.findAll = async(req,res)=>{
    const { page, size,search,PostulantId } = req.query;
    const { limit, offset } = getPagination(page, size);
    const condition = PostulantId ? {
        PostulantId
    } : null
    checkAuth(req,res);
    Conjoint.findAndCountAll({offset,limit,where:condition,include:Postulant,attributes:{exclude:"PostulantId"}})
    .then(data=>{   
        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving conjoints."
          });
    })
}

exports.update = async(req,res)=>{
    const {id} = req.params;
    checkAuth(req,res);
    const conjoint = await Conjoint.update(req.body,{where:{id},returning:true});
    return res.status(200).send(conjoint);
}

exports.delete = async(req,res)=>{
    const {id} = req.params;
    checkAuth(req,res);
        await Conjoint.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"conjoint deleted"});
}