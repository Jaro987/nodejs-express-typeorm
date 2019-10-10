module.exports = app => {
    const users = require("../controllers/user.controller");
  
    var VerifyToken = require('../auth/VerifyToken');
  
    app.post(
        "/users",
        VerifyToken,
        users.create
    );
  
    app.get(
        "/users",
        VerifyToken,
        users.findAll
    );
  
    app.get(
        "/users/:userId",
        VerifyToken,
        users.findUserById
    );
  
    app.put(
        "/users/:userId",
        VerifyToken,
        users.update
    );
  
    app.delete(
        "/users/:userId",
        VerifyToken,
        users.delete
    );
  
    app.delete(
        "/users",
        VerifyToken,
        users.deleteAll
    );
  };