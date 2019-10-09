const express = require("express");
const bodyParser = require("body-parser");
const Connection = require("typeorm");
// const Customer = require("./entity/customerSchema.js")

// // create typeorm connection
// Connection.createConnection();
// Connection.createConnection().then(connection => {
//     const customerRepository = connection.getRepository(Customer);

// create and setup express app
const app = express();
app.use(bodyParser.json());

// register routes

// app.get("/customers", async function(req, res) {
//     const customers = await customerRepository.find();
//     res.json(customers);
// });
// 
// app.get("/customers/:id", async function(req, res) {
//     const results = await customerRepository.findOne(req.params.id);
//     return res.send(results);
// });
// 
// app.post("/customers", async function(req, res) {
//     const customer = await customerRepository.create(req.body);
//     const results = await customerRepository.save(customer);
//     return res.send(results);
// });
// 
// app.put("/customers/:id", async function(req, res) {
//     const customer = await customerRepository.findOne(req.params.id);
//     customerRepository.merge(customer, req.body);
//     const results = await customerRepository.save(customer);
//     return res.send(results);
// });
// 
// app.delete("/customers/:id", async function(req, res) {
//     const results = await customerRepository.delete(req.params.id);
//     return res.send(results);
// });

// start express server
require("./routes/customer.routes")(app);
app.listen(3000);
// });