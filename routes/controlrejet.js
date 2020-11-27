module.exports = app => {
    const control_rejet = require("../controllers/controlrejet.js");
  
    const router = require("express").Router();

    router.get("/",control_rejet.findAll);
    router.get("/:id",control_rejet.findOne);
    router.post("/",control_rejet.create);
    router.put("/:id",control_rejet.update);
    router.delete("/:id",control_rejet.delete);

  
    app.use('/api/control_rejet', router);
  };