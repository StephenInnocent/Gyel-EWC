const {model, Schema} = require("mongoose");

const judgeSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    judgeID: {
        type: String,
        required:true,
        unique: true
    },
    role: {
        type: String,
        default: "Judge"
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
    quota: [{
        referenceID: String,
        textURL: String,
        scores: {
            total: Number,
            markedBy: [{
                name: String
            }]
        }
    }]
},{timestamps: true});

const Judges = model("Judges", judgeSchema);

module.exports = {
    Judges
}