const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");

const isAuth = require("./middlewares/isAuth");
const { PORT } = require('./config/env.config');

const app = express();
const HOST = "127.0.0.1";

//? for cors
app.use(cors());

//? for auth handling
app.use(isAuth);

//? for compression of requests.
app.use(compression());

//? parse requests of content-type: application/json
app.use(bodyParser.json());

//? parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//? static folders
app.use(express.static('app'))

//? morgan logger
app.use(morgan("dev"));

require("./routes/agents")(app);
require("./routes/postulant")(app);
require("./routes/transmition")(app);
require("./routes/affrejet")(app);
require("./routes/cfrejet")(app);
require("./routes/revenuerejet")(app);
require("./routes/verification")(app);
require("./routes/dossier")(app);
require("./routes/liste")(app);
require("./routes/controlrejet")(app);
require("./routes/project.js")(app);

//? simple route
app.get("/", (req, res) => {
  res
  .status(201)
  .json({ message: "Welcome to CNL application." });
});

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
}); 


app.listen(PORT || 8080, async() => {
  try {
    console.log(`API running on http://${HOST}:${PORT || 8080}`)
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})

//TODO history table for admin.

//TODO search , filter , ordering for the reste of Tables.