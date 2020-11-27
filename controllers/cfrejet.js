const CfRejet = require("../models").CfRejet;
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
        const cf_rejet = await CfRejet.build(req.body);
        await cf_rejet.save();
        return res.status(201).send(cf_rejet);
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
        const cf_rejet = await CfRejet.findByPk(id);
        if (!cf_rejet){
            return res.status(404).send({
                message:"cf_rejet dont exist"
            })
        }
        return res.status(200).send(cf_rejet);
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
}

exports.findAll = async(req,res)=>{
    const { page, size,search } = req.query;
    const { limit, offset } = getPagination(page, size);
    const condition = dossierId ? {dossierId: dossierId} : null;

    checkAuth(req,res);
    CfRejet.findAndCountAll({offset,limit,where:condition})
    .then(data=>{   
        const response = getPagingData(data, page, limit);
        return res.send(response);
    })
    .catch(err=>{
        return res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving cf_rejet."
          });
    })
}

exports.update = async(req,res)=>{
    const {id} = req.params;
    checkAuth(req,res);
    const control_rejet = await CfRejet.update(req.body,{where:{id},returning:true});
    return res.status(200).send(control_rejet);
}

exports.delete = async(req,res)=>{
    const {id} = req.params;
        checkAuth(req,res);
        await CfRejet.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"cf_rejet deleted"});
}