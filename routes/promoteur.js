module.exports = app => {
    const promoteur = require("../controllers/promoteur.js");
  
    const router = require("express").Router();

    router.post("/promoteur",promoteur.create);
    router.get("/promoteur/all",promoteur.findAll);
    router.get("/promoteur/:id",promoteur.findOne);
    router.put("/promoteur/:id",promoteur.update);
    router.delete("/promoteur/:id",promoteur.delete);

    app.use('/api', router);
  };