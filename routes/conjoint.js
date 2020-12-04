module.exports = app => {
    const conjoint = require("../controllers/conjoint");
  
    const router = require("express").Router();
  
    router.get("/",conjoint.findAll);
    router.get("/:id",conjoint.findOne);
    router.post("/",conjoint.create);
    router.put("/:id",conjoint.update);
    router.delete("/:id",conjoint.delete);
  
  
    app.use('/api/conjoint', router);
  };