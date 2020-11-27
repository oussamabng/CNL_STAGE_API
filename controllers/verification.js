const Verification = require("../models").Verification;
const db = require("../models/index");
const Op = db.Sequelize.Op;
const {checkAuth} = require("../middlewares/checkAuth");
const { getPagingData,getPagination } = require("../middlewares/pagination");
const Order = require("../middlewares/order");

exports.create = async(req,res)=>{
    try {
        checkAuth(req,res);
        const verification = await Verification.build(req.body);
        await verification.save();
        return res.status(201).send(verification);
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
        const verification = await Verification.findByPk(id);
        return res.status(200).send(verification);
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
}

exports.findAll = async(req,res)=>{
    try {
        const { page, size,dossierId,ordering } = req.query;
        const { limit, offset } = getPagination(page, size);
        const condition = dossierId ? {dossierId: dossierId} : null;
        checkAuth(req,res);
        Verification.findAndCountAll({offset,limit,where:condition,order:Order(ordering)})
        .then(data=>{
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving verification."
              });
        })
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
}

exports.update = async(req,res)=>{
    const {id} = req.params;
    checkAuth(req,res);
    const verification = await Verification.update(req.body,{where:{id},returning:true});
    return res.status(200).send(verification);
}

exports.delete = async(req,res)=>{
    const {id} = req.params;    
    checkAuth(req,res);
        await Verification.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"verification deleted"});
}