const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique: true
    }, 
    sex: {
        type: String,
        enum:["Male","Female"]
    },
    textURL: {
        type: String,
        // required:true
    },
    indigeneCerURL: {
        type: String,
        // required:true
    },
    schoolIDURL: {
        type: String,
        // required:true
    },
    referenceID: {
        type: String,
        unique: true
    },
    village: {
        type: String,
        enum:["Sot","Tahei","Sankon","Rankyeng","Tanchol","Gura-Dabwam","Gura-Riyom","Kul","Gatong","Lyoh","Lyoh-Rak","Nyango-Tah"]
    },
    scores:{
        total: Number,
        markedBy: [{
            name: String
        }]
    }
},{timestamps: true});

const Users = model("Applicants",userSchema)

module.exports = {
    Users
}