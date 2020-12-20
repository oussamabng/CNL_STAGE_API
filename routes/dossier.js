module.exports = app => {
    const dossier = require("../controllers/dossier.js");
  
    const router = require("express").Router();

    router.post("/dossier",dossier.create);
    router.get("/dossier",dossier.findAll);
    router.get("/dossier/:id",dossier.findOne);
    router.put("/dossier/:id",dossier.update);
    router.delete("/dossier/:id",dossier.delete)
    router.get("/dossier/agent/:AgentId",dossier.getForAgent);

  
    app.use('/api', router);
  };