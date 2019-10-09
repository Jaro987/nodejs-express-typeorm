const Customer = require("../entity/customerSchema");
const Connection = require("typeorm");

// create typeorm connection
let customerRepository = null;
Connection.createConnection().then(connection => {
    customerRepository = connection.getRepository(Customer);
});

exports.create = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.active) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    const customer = await customerRepository.create(req.body);
    const results = await customerRepository.save(customer);
    res.send(results);
};

exports.findAll = async (req, res) => {
    const customers = await customerRepository.find();
    res.json(customers);
};

exports.findOne = async (req, res) => {
// console.log(req.params);
    let result = null;
    result = await customerRepository.findOne(req.params.customerId);
    if (result === undefined){
        res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
    }
    console.log(typeof result);
    return res.send(result);
};

exports.update = async (req, res) => {
    console.log(req.body);
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }
  console.log(req.params);
    const customer = await customerRepository.findOne(req.params.customerId);
    customerRepository.merge(customer, req.body);
    const result = await customerRepository.save(customer);
    return res.send(result);
};


exports.delete = async (req, res) => {
    const results = await customerRepository.delete(req.params.customerId);
    return res.send(results);
};

exports.deleteAll = async (req, res) => {
  Customer.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    } else {
      res.send({ message: `All Customers were deleted successfully!` });
    }
  });
};
