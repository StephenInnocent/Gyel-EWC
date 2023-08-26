const {Admin, model, Schema} = require("mongodb");

const seederAdmin = new Admin({
    name: String,
    password: String,
    email: String,
    role: 'Seeder Admin'
});

module.exports = {
    seederAdmin
}