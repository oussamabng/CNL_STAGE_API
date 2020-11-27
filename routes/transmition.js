module.exports = app => {
    const transmition = require("../controllers/transmition.js");
    const router = require("express").Router();

    router.get("/transmition",transmition.findAll);
    router.get("/transmition/:id",transmition.findOne);
    router.post("/transmition",transmition.create);
    router.put("/transmition/:id",transmition.update);
    router.delete("/transmition/:id",transmition.delete);
  
    app.use('/api', router);
  };