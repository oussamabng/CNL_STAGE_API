module.exports = app => {
    const dossier = require("../controllers/dossier.js");
  
    const router = require("express").Router();

    router.post("/",dossier.create);
    router.get("/",dossier.findAll);
    router.get("/:id",dossier.findOne);
    router.put("/:id",dossier.update);
    router.delete("/:id",dossier.delete);
  
    app.use('/api/dossier', router);
  };