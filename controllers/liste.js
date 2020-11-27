const Liste = require("../models").Liste;
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
        const liste = await Liste.build(req.body);
        await liste.save();
        return res.status(201).send(liste);
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
        const liste = await Liste.findByPk(id);
        if (!liste){
            return res.status(404).send({
                message:"liste dont exist"
            })
        }
        return res.status(200).send(liste);
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
    Liste.findAndCountAll({offset,limit})
    .then(data=>{   
        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving listes."
          });
    })
}


exports.update = async(req,res)=>{
    const {id} = req.params;
    checkAuth(req,res);
    const liste = await Liste.update(req.body,{where:{id},returning:true});
    return res.status(200).send(liste);
}

exports.delete = async(req,res)=>{
    const {id} = req.params;
        checkAuth(req,res);
        await Liste.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"liste deleted"});
}