module.exports = app => {
    const project = require("../controllers/project.js");
    const router = require("express").Router();

    router.post("/project",project.create);
    router.get("/project",project.findAll);
    router.get("/project/:id",project.findOne);
    router.put("/project/:id",project.update);
    router.delete("/project/:id",project.delete);
    
    app.use('/api', router);
  };