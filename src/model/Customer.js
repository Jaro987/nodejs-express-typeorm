class Customer {
    constructor(id, name, email, active) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = active;
    }
}

module.exports = {
    Customer: Customer
};