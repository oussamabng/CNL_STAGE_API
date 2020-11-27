const Postulant = require("../models").Postulant;
const db = require("../models/index");
const Op = db.Sequelize.Op;
const {checkAuth} = require("../middlewares/checkAuth");

const { getPagingData,getPagination } = require("../middlewares/pagination");

exports.create = async(req,res)=>{
    try {
        checkAuth(req,res);
        const postulant = await Postulant.build(req.body);
        await postulant.save();
        return res.status(201).send(postulant);
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
    const postulant = await Postulant.findOne({where:{id}});
    return res.status(200).send(postulant);
}

exports.findAll = async(req,res)=>{
    const { page, size,search } = req.query;
    const { limit, offset } = getPagination(page, size);
    checkAuth(req,res);
    Postulant.findAndCountAll({offset,limit})
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
    const postulant = await Postulant.update(req.body,{where:{id},returning:true});
    return res.status(200).send(postulant);
}

exports.delete = async(req,res)=>{
    const {id} = req.params;
    checkAuth(req,res);
        await Postulant.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"postulant deleted"});
}