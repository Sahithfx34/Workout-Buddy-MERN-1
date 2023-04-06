const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

const requireAuth = async(req,res,next)=>{

    //verify authentication
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: "Authorization token required"})
    }

    const token = authorization.split(" ")[1]

    try{
        const {_id} = jwt.verify(token,process.env.SECRET)
        req.user = await userModel.findOne({_id}).select("_id")//on id is passed
        next()
    }catch(e){
        console.log(e);
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireAuth;