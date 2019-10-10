const express = require("express");
const bodyParser = require("body-parser");
const Connection = require("typeorm");

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));

var AuthController = require('./auth/AuthController');
app.use('/', AuthController);
require("./routes/customer.routes")(app);
require("./routes/user.routes")(app);
app.listen(3000);
