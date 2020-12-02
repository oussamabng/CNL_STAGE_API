module.exports = app => {
    const promoteur = require("../controllers/promoteur.js");
  
    const router = require("express").Router();

    router.post("/",promoteur.create);
    router.get("/",promoteur.findAll);
    router.get("/:id",promoteur.findOne);
    router.put("/:id",promoteur.update);
    router.delete("/:id",promoteur.delete);

    app.use('/api/promoteur', router);
  };