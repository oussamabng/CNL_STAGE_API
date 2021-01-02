const Project = require("../models").Project;
const Promoteur = require("../models").Promoteur;
const db = require("../models/index");
const Op = db.Sequelize.Op;
const { checkAuthAndAdmin, checkAuth } = require("../middlewares/checkAuth");
const { getPagingData,getPagination } = require("../middlewares/pagination");
const Order = require("../middlewares/order");

exports.create = async(req,res)=>{
    try {
        checkAuthAndAdmin(req,res);
        const project = await Project.build(req.body);
        await project.save();
        return res.status(201).send(project);
        
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
};

exports.findOne = async(req,res)=>{
    try {
        const { intitulé } = req.query;
        checkAuth(req,res);
        const { id } = req.params;
        const condition = intitulé ? {id,intitulé} : {id}
        const project = await Project.findOne({
            where:condition
        });
        return res.status(200).send(project);
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
    
};

exports.findAll = async(req,res)=>{
        const { page, size,ordering,search,PromoteurId } = req.query;
        const { limit, offset } = getPagination(page, size);
        const condition = search ? {
            [Op.or]: [
              { intitulé: { [Op.like]: `%${search}%` } },
              { commune: { [Op.like]: `%${search}%` } },
              {
                '$Promoteur.first_name$':{ [Op.like]: `%${search}%` }
              },
              {
                '$Promoteur.last_name$':{ [Op.like]: `%${search}%` }
              },
              PromoteurId && {
                '$Promoteur.id$':{ [Op.like]: `%${PromoteurId}%` }
              }
            ]
          } : {}
        checkAuth(req,res);
        Project.findAndCountAll({offset,limit,order:Order(ordering),where:condition,include:Promoteur,attributes:{exclude:["promoteur_id","PromoteurId"]}})
        .then(data=>{
            const response = getPagingData(data, page, limit);
            return res.status(200).send(response); 
        })
        .catch(err=>{
            return res.send({
                message:
                  err.message || "Some error occurred while retrieving projects."
              });
        })
};

exports.update = async(req,res)=>{
    try {
        checkAuthAndAdmin(req,res);
        const { id } = req.params;
        const project_updated = await Project.update(req.body,{where:{id},returning:true});
        return res.status(200).send(project_updated);
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
};

exports.delete = async(req,res)=>{
    try {
        checkAuthAndAdmin(req,res);
        const {id} = req.params;    
        await Project.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"Project deleted"});
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
}