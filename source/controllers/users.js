const { Users} = require("../models/users");
const bcrypt = require("bcrypt");
const { missingFieldError } = require("../middlewares/utilities/errormessage");
const { generateUniqueCode } = require("../middlewares/utilities/functions");
const { Admins } = require("../models/Admin");
const { Judges } = require("../models/judges");
const { applyForEssayVal } = require("../middlewares/validation/users");



async function createUser(req,res){
    try{
        const result = applyForEssayVal.safeParse(req.body);

        if(!result.success){
            missingFieldError()
        } else{
            const userId = await generateUniqueCode(req.body.name);
            
            
            const user = await Users.create({
                name: req.body.name,
                age: req.body.age,
                school: req.body.school,
                class: req.body.class,
                email: req.body.email,
                village: req.body.village,
                referenceID: userId
            })
            console.log(user);
            res.status(200).json(`Application was succesfull!`);

        }

    } catch(e){
        res.status(500).json({e, message:`Internal Server Error`})
    } finally{
        res.end()
    }
}

async function changePassword(req,res){
    try{
        const salt = bcrypt.genSaltSync(16);
        const encryptedPassword = bcrypt.hash(req.body.newPassword, salt);

        if(req.params.role == 'admin'){
            const user = await Admins.find({adminID: req.body.key});

            if(!bcrypt.compare(req.body.oldPassword, user.password)){
                res.status(400).json(`Wrong password`)
            } else{
                const update = await Admins.updateOne({adminID: req.body.key},{password: encryptedPassword});

                res.status(200).json(`Password Changed succesfully`)
            }
        } else if(req.params.role == 'judge'){
            const user = await Judges.find({adminID: req.body.key});

            if(!bcrypt.compare(req.body.oldPassword, user.password)){
                res.status(400).json(`Wrong password`)
            } else{
                const update = await Judges.updateOne({adminID: req.body.key},{password: encryptedPassword});

                res.status(200).json(`Password Changed succesfully`)
            }
        }
    } catch(e){
        res.status(500).json(e);
    } finally{
        res.end();
    }
}

module.exports = {
    createUser,
    changePassword
}