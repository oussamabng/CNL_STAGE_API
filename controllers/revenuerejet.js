const RevenueRejet = require("../models").RevenueRejet;
const db = require("../models/index");
const Op = db.Sequelize.Op;
const {checkAuth} = require("../middlewares/checkAuth");
const { getPagingData,getPagination } = require("../middlewares/pagination");
const Order = require("../middlewares/order");

exports.create = async(req,res)=>{
    try {
        checkAuth(req,res);
        const rv = await RevenueRejet.build(req.body);
        await rv.save();
        return res.status(201).send(rv);
        
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
        const rv = await RevenueRejet.findByPk(id);
        return res.status(200).send(rv);
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
    RevenueRejet.findAndCountAll({offset,limit,where:condition,order:Order(ordering)})
    .then(data=>{   
        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving revenue rejet."
          });
    })
}

exports.update = async(req,res)=>{
    try {
        const {id} = req.params;
    checkAuth(req,res);
    const revenue_rejet = await RevenueRejet.update(req.body,{where:{id},returning:true});
    return res.status(200).send(revenue_rejet);
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
}

exports.delete = async(req,res)=>{
    try {
        const {id} = req.params;    
    checkAuth(req,res);
        await RevenueRejet.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"Revenue Rejet deleted"});
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
}