module.exports = app => {
    const liste = require("../controllers/liste.js");
  
    const router = require("express").Router();

    router.post("/",liste.create);
    router.get("/",liste.findAll);
    router.get("/:id",liste.findOne);
    router.put("/:id",liste.update);
    router.delete("/:id",liste.delete);

    app.use('/api/liste', router);
  };