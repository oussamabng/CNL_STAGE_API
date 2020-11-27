module.exports = app => {
  const cf_rejet = require("../controllers/cfrejet");

  const router = require("express").Router();

  router.get("/",cf_rejet.findAll);
  router.get("/:id",cf_rejet.findOne);
  router.post("/",cf_rejet.create);
  router.put("/:id",cf_rejet.update);
  router.delete("/:id",cf_rejet.delete);


  app.use('/api/cf_rejet', router);
};