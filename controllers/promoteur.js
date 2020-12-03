const Promoteur = require("../models").Promoteur;
const db = require("../models/index");
const Op = db.Sequelize.Op;
const { checkAuthAndAdmin } = require("../middlewares/checkAuth");
const { getPagingData,getPagination } = require("../middlewares/pagination");
const order = require("../middlewares/order");

exports.create = async(req,res)=>{
    checkAuthAndAdmin(req,res);
    try {
        if(!req.body){
            return res.status(404).send({
                message:"data required"
            })
        }
        const promoteur = await Promoteur.build(req.body);
        await promoteur.save();
        return res.status(201).send(promoteur);
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
}

exports.findOne = async(req,res)=>{
    if (!checkAuthAndAdmin(req,res)){
        try {
            const {id} = req.params;
            const promoteur = await Promoteur.findByPk(id);
            if (!promoteur){
                return res.status(404).send({
                    message:"promoteur dont exist"
                })
            }
             res.status(200).send(promoteur);
        } catch (error) {
            return res
                .status(500)
                .send({
                    message: error.message,
                });
        }
    }
    
}

exports.findAll = async(req,res)=>{
    const { page, size,search,ordering } = req.query;
    const { limit, offset } = getPagination(page, size);
    const condition = search ? {
        [Op.or]: [
          { first_name: { [Op.like]: `%${search}%` } },
          { last_name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ]
      } : {}
    checkAuthAndAdmin(req,res);
    Promoteur.findAndCountAll({offset,limit,where:condition,order:order(ordering)})
    .then(data=>{   
        const response = getPagingData(data, page, limit);
        return res.send(response);
    })
    .catch(err=>{
        return res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving promoteurs."
          });
    })
}


exports.update = async(req,res)=>{
    const {id} = req.params;
    checkAuthAndAdmin(req,res);
    const promoteur = await Promoteur.update(req.body,{where:{id},returning:true});
    return res.status(200).send(promoteur);
}

exports.delete = async(req,res)=>{
    const {id} = req.params;
    checkAuthAndAdmin(req,res);
        await Promoteur.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"promoteur deleted"});
}