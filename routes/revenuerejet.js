module.exports = app => {
    const revenue_rejet = require("../controllers/revenuerejet.js");
  
    const router = require("express").Router();

    router.post("/",revenue_rejet.create);
    router.get("/",revenue_rejet.findAll);
    router.get("/:id",revenue_rejet.findOne);
    router.put("/:id",revenue_rejet.update);
    router.delete("/:id",revenue_rejet.delete);

    app.use('/api/revenue_rejet', router);
  };