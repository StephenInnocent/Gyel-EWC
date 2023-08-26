const {Judges} = require("../models/judges");
const { Admins } = require("../models/Admin");
const bcrypt = require("bcrypt");
const { MaxKey } = require("mongodb");



async function judgesLogin(req,res){
    try{
        const user = await Judges.find({email: req.body.email});

        if(user){
            if(!bcrypt.compare(req.body.password, user.email)){
                res.status(400).json(`Wrong password`)
            } else{
                const key = jwt.sign(user._id,process.env.JWT_SEC);

                res.status(200).cookie("passkey",key).redirect("/admin")
            }
        }
    }catch(e){
        res.status(500).json(e)
    }finally{
        res.end()
    }
}

async function getQuota(req,res){
    try{
        const quota = await Judges.find({judgeID: req.body.key},{quota:1});

        res.status(200).json(quota)
    }catch(e){
        res.status(500).json({e, message:`Internal Server Error`})
    }finally{
        res.end()
    }
}

module.exports = {
    judgesLogin,
    getQuota
}