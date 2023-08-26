const {model, Schema} = require("mongoose");

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    adminID: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required:true,
        select: false,
        min: 7
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    role: {
        type: String,
        enum: ["Admin","Seeder Admin"],
        default: 'Admin'
    },
},{timestamps: true});

const Admins = model("Admins", adminSchema);

module.exports = {
    Admins
}