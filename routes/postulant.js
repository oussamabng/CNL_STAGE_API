module.exports = app => {
    const postulant = require("../controllers/postulant.js");
    const router = require("express").Router();

    router.get("/postulant",postulant.findAll);
    router.get("/postulant/:id",postulant.findOne);
    router.post("/postulant",postulant.create);
    router.put("/postulant/:id",postulant.update);
    router.delete("/postulant/:id",postulant.delete);
  
    app.use('/api', router);
  };