const Project = require("../models").Project;
const db = require("../models/index");
const Op = db.Sequelize.Op;
const { checkAuthAndAdmin } = require("../middlewares/checkAuth");
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
    if (!checkAuthAndAdmin(req,res)){
        try {
            const { id } = req.params;
            const project = await Project.findByPk(id);
            return res.status(200).send(project);
        } catch (error) {
            return res
                .status(500)
                .send({
                    message: error.message,
                });
        }
    }
    
};

exports.findAll = async(req,res)=>{
        checkAuthAndAdmin(req,res);
        const { page, size,ordering } = req.query;
        const { limit, offset } = getPagination(page, size);
        Project.findAndCountAll({offset,limit,order:Order(ordering)})
        .then(data=>{
            const response = getPagingData(data, page, limit);
            return res.status(200).send(response); 
        })
        .catch(err=>{
            return res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving postulants."
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