const { Users } = require("../../models/users");



async function checkIfUserExists(req,res,next){
    try{
        let user = await Users.findOne({name: req.body.name, email: req.body.email});
        if(user) next({success: true}) 
        else{
            next({success: false});
        }
    }catch(e){
        console.error("A server error ocurred", 500)
    }
}

async function generateUniqueCode(payload){
    const firstName = payload.split(" ")[0];
    const secondName = payload.split(" ")[1];
    const Unicode = firstName.toString().toUpperCase().slice(0,3).concat(secondName.toString().toUpperCase().slice(0,3)).concat(Math.random().toFixed(5)+"@Gyel");
    console.log(Unicode);
    return Unicode;
}

module.exports = {
    generateUniqueCode,
    checkIfUserExists
}