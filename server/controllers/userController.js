const { userModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const CreateToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: "3d"});
}
const userLogin = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.login(email,password)
        const token = CreateToken(user._id)

        res.status(200).json({email,token})

    }catch(error){
        res.status(400).json({error: error.message})

    }

}
const userSignup = async(req,res)=>{

    const {email,password} = req.body;
    try{
        const user = await userModel.signup(email,password)
        const token = CreateToken(user._id)

        res.status(200).json({email,token})

    }catch(error){
        res.status(400).json({error: error.message})

    }
}

module.exports = {userLogin , userSignup};