const EntitySchema = require("typeorm").EntitySchema;
const Users = require("../model/User.js").Users;

module.exports = new EntitySchema({
    name: "Users",
    target: Users,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        email: {
            type: "varchar"
        },
        password: {
            type: "varchar"
        }
    }
});