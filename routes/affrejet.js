module.exports = app => {
    const affrejet = require("../controllers/affrejet");
  
    const router = require("express").Router();

    router.get("/",affrejet.findAll);
    router.get("/:id",affrejet.findOne);
    router.post("/",affrejet.create);
    router.put("/:id",affrejet.update);
    router.delete("/:id",affrejet.delete);
  
    app.use('/api/aff_rejet', router);
  };