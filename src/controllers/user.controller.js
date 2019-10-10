const User = require("../entity/userSchema");
const Connection = require("typeorm");

// create typeorm connection
let userRepository = null;
Connection.createConnection().then(connection => {
    userRepository = connection.getRepository(User);
});

exports.create = async (req, res) => {
  console.log(req.body);
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    const user = await userRepository.create(req.body);
    const results = await userRepository.save(user);
    res.send(results);
};

exports.findAll = async (req, res) => {
    const users = await userRepository.find();
    res.json(users);
};

exports.findUserById = async (req, res) => {
    let result = null;
    result = await userRepository.findOne(req.params.userId);
    if (result === undefined){
        res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
    }
    return res.send(result);
};

exports.findUserByEmail = async (req, res) => {
    let result = null;
    result = await userRepository.find({
        email: DB.Like(req.body.email)
    });
    if (result === undefined){
        res.status(404).send({
            message: `Not found User with id ${req.body.email}.`
          });
    }
    return res.send(result);
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } else {
    const user = await userRepository.findOne(req.params.userId);
    const updatedUser = userRepository.merge(user, req.body);
    const result = await userRepository.save(updatedUser);
    return res.send(result);
  }
};


exports.delete = async (req, res) => {
    const result = await userRepository.delete(req.params.userId);
    return res.send(result);
};

exports.deleteAll = async (req, res) => {
  User.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    } else {
      res.send({ message: `All Users were deleted successfully!` });
    }
  });
};
