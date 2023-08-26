const { Users} = require("../models/users");
const bcrypt = require("bcrypt");
const {createAdminVal} = require("../middlewares/validation/users");
const jwt = require('jsonwebtoken')
const { missingFieldError , formatZodError} = require("../middlewares/utilities/errormessage");
const { generateUniqueCode } = require("../middlewares/utilities/functions");
const { Admin } = require("mongodb");
const { Judges } = require("../models/judges");
const { Admins } = require("../models/Admin");

async function adminLogin(req,res){
    try{
        const user = await Admins.find({email: req.body.email});

        if(user){
            if(!bcrypt.compare(req.body.password, user.email)){
                res.status(400).json(`Wrong password`)
            } else{
                const key = jwt.sign(user._id,process.env.JWT_SEC);

                res.status(200).cookie('passkey',key).redirect("/admin")
            }
        }
    }catch(e){
        res.status(500).json(e)
    }finally{
        res.end()
    }
}

async function createAdminOrJudge(req,res){
    try{
        const result = createAdminVal.safeParse(req.body);
        if(!result.success){
            res.status(400).json(formatZodError(result.error))
        } else{

            const userId = await generateUniqueCode(req.body.name);

            const salt = bcrypt.genSaltSync(16);
            const encryptedPassword =  await bcrypt.hash(req.body.password, salt);

            console.log(encryptedPassword);

            if(req.params.role == 'admin'){
                const user = await Admins.create({
                    name: req.body.name,
                    password: encryptedPassword,
                    email: req.body.email,
                    adminID: userId
                });
                console.log(`new Admin`);
                res.status(200).json(`Dear ${user.name},Your Application was succesfull!`);

            } else{
                const user  = await Judges.create({
                    name: req.body.name,
                    judgeID: userId,
                    password: encryptedPassword,
                    email: req.body.email
                });
                console.log(`Judge added`);  
                res.status(200).json(`Dear ${user.name},Your Application was succesfull!`);

            }
        }

    } catch(e){
        res.status(500).json({e, message:`Internal Server Error`})
    } finally{
        res.end()
    }
}



module.exports = {
    createAdminOrJudge,
    adminLogin
}