module.exports = app => {
    const decision = require("../controllers/decision.js");
    
    const router = require("express").Router();

    router.get("/",decision.findAll);
    router.get("/:id",decision.findOne);
    router.post("/",decision.create);
    router.put("/:id",decision.update);
    router.delete("/:id",decision.delete);
  
    app.use('/api/decision', router);
  };