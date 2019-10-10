var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('./VerifyToken');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// var User = require('../app/models/user.model');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');
////////////////
const User = require("../entity/userSchema");
const Connection = require("typeorm");
let userRepository = null;
Connection.createConnection().then(connection => {
    userRepository = connection.getRepository(User);
});

router.post('/register', async function(req, res) {
  
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const tempUser = {
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  };
  const user = await userRepository.create(tempUser);
  const result = await userRepository.save(user);
  if (result) {
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 1000
    });
  }
  res.status(200).send({ auth: true, token: token });

});

router.get('/me', VerifyToken, async function(req, res) {
  let result = null;
  result = await userRepository.findOne(req.params.userId);
  if (result === undefined) {
    res.status(404).send({
      message: `Not found User with id ${req.params.userId}.`
    });
  }
  return res.send(result);
});

router.post('/login', async function(req, res) {
    let result = null;
    result = await userRepository.find({
      email: Connection.Like(req.body.email)
    });
    if (result === undefined){
      res.status(404).send({
        message: `Not found User with id ${req.body.email}.`
      });
    }
    console.log(result);
    console.log(req.body.password);
    var passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    
    var token = jwt.sign({ id: result[0].id }, config.secret, {
      expiresIn: 1000
    });
    
    res.status(200).send({ auth: true, token: token });

});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null, msg: "Successfull logout" });
});

  module.exports = router;