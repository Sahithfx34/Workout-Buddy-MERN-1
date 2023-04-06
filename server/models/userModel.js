const mongoose = require("mongoose");
const bcrypt =  require("bcrypt");
const validator =  require("validator");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

//static signup method

userSchema.statics.signup = async function(email,password){

    //vadiation
    if(!email || !password){
        throw Error("Please fill all the Fields");
    }
    if(!validator.isEmail(email)){
        throw Error("Enter a Valid email");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough try to use number,lowercase,uppercase and symbol to make your password strong")
    }
    const exist = await this.findOne({email});

    if(exist){
        throw Error("User Already exist")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({email,password: hash})

    return user;

}

userSchema.statics.login = async function(email,password){

    if(!email || !password){
        throw Error("Please fill all the Fields");
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error("Incorrect email");
    }

    const pass = await bcrypt.compare(password, user.password);

    if(!pass){
        throw Error("Incorrect Password");
    }

    return user
}

const userModel = mongoose.model("user",userSchema);
module.exports = {userModel};