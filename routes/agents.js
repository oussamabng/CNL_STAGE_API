module.exports = app => {
    const agents = require("../controllers/agents.js");
  
    const router = require("express").Router();
  
    // Create a new agent
    router.post("/auth/register", agents.register);

    // Login for agent
    router.post("/auth/login", agents.login);

    // get self agent
    router.get("/agents/self",agents.findSelf);
  
    // Retrieve all agents
    router.get("/agents", agents.findAll);

    // Retrieve a single agent with id
    router.get("/agents/:id", agents.findOne);
  
    // Update a agent with id
    router.put("/agents/:id", agents.update);
  
    // Delete a agent with id
    router.delete("/agents/:id", agents.delete);

    // Logout agent
    router.get("/auth/logout",agents.logout);

    // create superuser 
    router.post("/auth/admin/create",agents.create_superuser)
  
    app.use('/api', router);
  };