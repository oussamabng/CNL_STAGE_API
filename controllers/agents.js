const Agent = require("../models").Agent;
const db = require("../models/index");
const Op = db.Sequelize.Op;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {checkAuth,checkAuthAndAdmin} = require("../middlewares/checkAuth");

const { getPagingData,getPagination } = require("../middlewares/pagination");
const { JWT_ACCESS_KEY } = require('../config/env.config');

//! POST /api/auth/register
exports.register = async(req, res) => {
    try {
        //? delete later is_admin
        const { email, password, username } = req.body;
        if (!validator.isEmail(email) || password.length <= 4 ||username.length <= 4 ){
            return res.status(500).send({ message: "inputs non valides" });
        }

        ////? case inputs are valid
        const userExist = await Agent.findOne({where:{ email }});
        if (userExist !== null) {
            return res
                    .status(409)
                    .send({
                    message: "L'adresse e-mail que vous avez saisie est déjà enregistrée",
                    });
        }
        //? case user does not exist
        const passwordHashed = await bcrypt.hash(password, 12);
        const agent = await Agent.build({email,username,password:passwordHashed});
        await agent.save();
        await Agent.sync();

        //? send token
        const accessToken = await jwt.sign({ userId: agent.id,is_admin:agent.is_admin }, JWT_ACCESS_KEY, {
            expiresIn: "6h"
        });
        return res.status(200).send({
            message: "utilisateur connecté avec succès",
            accessToken,
        });
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
};
  
//! GET /api/agents
exports.findAll = (req, res) => {
    const { page, size, email,search } = req.query;
    const { limit, offset } = getPagination(page, size);

    try {
        //? require auth and admin
        checkAuthAndAdmin(req,res);
    const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
    Agent.findAndCountAll({where:condition,offset,limit,attributes:["id","email","username","is_admin","createdAt","updatedAt"]})
    .then(data=>{   
        const response = getPagingData(data, page, limit);
        return res.status(200).send(response);
    })
    .catch(err=>{
        return res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving agents."
          });
    })
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
};

//! Find a single Agent with an id /api/agents/:id
exports.findOne = async(req, res) => {
  try {
    const {id} = req.params;
    const agent = await Agent.findOne({where:{id},attributes:["id","email","username","is_admin","createdAt","updatedAt"]});
    //? agent dont exist
    if (!agent){
        return res
        .status(404)
        .send({
            message:"agent n'existe pas"
        })
    }
    return res
    .status(200)
    .send(agent);
  } catch (error) {
    return res
    .status(500)
    .send({
        message: error.message,
    });
  }
};

//! Update a Agent by the id in the request
exports.update = async(req, res) => {
  try {
    const {id} = req.params;
    checkAuthAndAdmin(req,res);
    await Agent.update(
        req.body,
        {
        where:{id},
        returning:true
    });
    const agent = await Agent.findOne({where:{id},attributes:["id","email","username","is_admin","createdAt","updatedAt"]});
    res
    .status(200)
    .send(agent)
 
  } catch (error) {
    return res
    .status(500)
    .send({
        message: error.message,
    });
  }
};

//! Delete a Agent with the specified id in the request
exports.delete = async(req, res) => {
    try {
        checkAuthAndAdmin(req,res);
        const {id} = req.params;
        await Agent.destroy({where:{id}});
        return res
        .status(201)
        .send({message:"agent deleted"});

    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
};

//! Delete all Agents from the database.
exports.login = async(req, res) => {
    try {
        const {email,password} = req.body;

        //? check existence of the user
        const userExist = await Agent.findOne({where: {email} });

        //? case user dont exist
        if (!userExist){
            return res
            .status(500)
            .send({ message: "incorrect Email ou mot de passe" });
        }

        //? case user exist, compare password
        const equalPassword = await bcrypt.compare(password, userExist.password);

        //? case password false
        if (!equalPassword) {
            return res
            .status(500)
            .send({ message: "incorrect Email ou mot de passe" });
        }
        
        //? generate the token 
        const accessToken = await jwt.sign({ userId: userExist.id, is_admin:userExist.is_admin}, JWT_ACCESS_KEY, {
            expiresIn: "6h"
          });
          res.status(200).send({
            message: "utilisateur connecté avec succès",
            accessToken,
          });


    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
};

exports.logout = (req,res)=>{
    checkAuth(req,res);
    return res
      .status(201)
      .send({
        accessToken: '',
      });
}

exports.findSelf = async(req,res)=>{    
    try {
        checkAuth(req,res);
        const selfAgent = await Agent.findOne({where:{id:req.userId},attributes:["id","email","username","is_admin","createdAt","updatedAt"]});
        return res.status(200).send(selfAgent);
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            });
    }
}