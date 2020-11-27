module.exports = app => {
    const verification = require("../controllers/verification.js");
  
    const router = require("express").Router();

    router.post("/",verification.create);
    router.get("/",verification.findAll);
    router.get("/:id",verification.findOne);
    router.put("/:id",verification.update);
    router.delete("/:id",verification.delete);
  
    app.use('/api/verification', router);
  };