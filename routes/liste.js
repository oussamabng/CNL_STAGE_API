module.exports = app => {
    const liste = require("../controllers/liste.js");
  
    const router = require("express").Router();

    router.post("/liste",liste.create);
    router.get("/liste/all",liste.findAll);
    router.get("/liste/:id",liste.findOne);
    router.put("/liste/:id",liste.update);
    router.delete("/liste/:id",liste.delete);

    app.use('/api', router);
  };