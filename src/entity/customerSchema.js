const EntitySchema = require("typeorm").EntitySchema;
const Customers = require("../model/Customer.js").Customers;

module.exports = new EntitySchema({
    name: "Customers",
    target: Customers,
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
        active: {
            type: "boolean"
        }
    }
});