const cors = require("cors");
const express = require('express');
const bodyParser = require("body-parser");
const routeLoader = require("./routes");
const path = require('path');

require('dotenv').config();
let app = express();

const PORT = process.env.PORT || 8081;

const FRONT_URL = process.env.FRONT_URL || 'http://localhost:3001'; 

app.use(
  cors({
    origin: `${FRONT_URL}`,
    credentials: true
  })
);

app.use(bodyParser.json());

app = routeLoader.load(app);

app.listen(PORT, (err) => {

  if (err) throw new Error(err);
      console.log(`Servidor corriendo en puerto ${ PORT }`);

});

module.exports = app;
