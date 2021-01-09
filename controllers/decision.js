const Decision = require("../models").Decision;
const db = require("../models/index");
const Op = db.Sequelize.Op;
const { checkAuth } = require("../middlewares/checkAuth");
const { getPagingData,getPagination } = require("../middlewares/pagination");
const Order = require("../middlewares/order");


exports.create = async(req,res)=>{
    try {
        checkAuth(req,res);
        if (!req.body){
            return res.status(404).send({
                message:"data required"
            })
        }
        const decision = await Decision.build(req.body);
        await decision.save();
        return res.status(201).send(decision);
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
        const {id} = req.params;
        checkAuth(req,res);
        const decision = await Decision.findByPk(id);
        if (!decision){
            return res.status(404).send({
                message:"decision dont exist"
            })
        }
        return res.status(200).send(decision);
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
}


exports.findAll = async(req,res)=>{
    const { page, size,dossierId,ordering } = req.query;
    const { limit, offset } = getPagination(page, size);
    const condition = dossierId ? {dossierId: dossierId} : {};

    checkAuth(req,res);
    Decision.findAndCountAll({offset,limit,where:condition,order:Order(ordering)})
    .then(data=>{   
        const response = getPagingData(data, page, limit);
        return res.send(response);
    })
    .catch(err=>{
        return res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving decisions."
          });
    })
}

exports.update = async(req,res)=>{
    const {id} = req.params;
    checkAuth(req,res);
    const decision = await Decision.update(req.body,{where:{id},returning:true});
    return res.status(200).send(decision);
}

exports.delete = async(req,res)=>{
    const {id} = req.params;
        checkAuth(req,res);
        await Decision.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"decision deleted"});
}