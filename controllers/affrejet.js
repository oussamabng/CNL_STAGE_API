const AffRejet = require("../models").AffRejet;
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
        const af_rejet = await AffRejet.build(req.body);
        await af_rejet.save();
        return res.status(201).send(af_rejet);
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
        const af_rejet = await AffRejet.findByPk(id);
        if (!af_rejet){
            return res.status(404).send({
                message:"af_rejet dont exist"
            })
        }
        return res.status(200).send(af_rejet);
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
    const condition = dossierId ? {dossierId: dossierId} : null;

    checkAuth(req,res);
    AffRejet.findAndCountAll({offset,limit,where:condition,order:Order(ordering)})
    .then(data=>{   
        const response = getPagingData(data, page, limit);
        return res.send(response);
    })
    .catch(err=>{
        return res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving af_rejet."
          });
    })
}

exports.update = async(req,res)=>{
    const {id} = req.params;
    checkAuth(req,res);
    const af_rejet = await AffRejet.update(req.body,{where:{id},returning:true});
    return res.status(200).send(af_rejet);
}

exports.delete = async(req,res)=>{
    const {id} = req.params;
        checkAuth(req,res);
        await AffRejet.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"af_rejet deleted"});
}