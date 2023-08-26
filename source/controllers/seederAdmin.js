const { Admins } = require("../models/Admin");
const { Judges } = require("../models/judges");
const { Users } = require("../models/users");


async function getAllUsersOrJudgesOrAdmin(req,res){
    try{
        if(req.params.category == "admin"){
            const users = await Admins.find({role: "Admin"},{name:1});

            res.status(200).json(users);
        } else if(req.params.category == "judges"){
            const users = await Judges.find({role: "Judge"},{name:1});

            res.status(200).json(users);
        } else if(req.params.category == 'user'){
            const users = await Users.find();

            res.status(200).json(users);
        }
    } catch(e){
        res.status(500).json(e);
    } finally{
        res.end();
    }
}

module.exports = {
    getAllUsersOrJudgesOrAdmin
}