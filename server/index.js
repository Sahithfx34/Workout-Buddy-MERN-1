const express = require("express");
const app = express();
const workoutRoutes = require("./routes/workout")
const userRouter = require("./routes/userRouter")
const mongoose = require("mongoose");
require("dotenv").config();

//middleware
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(4000,()=>{
            console.log("Successfully Running on port 4000");
        })    
    }).catch((error)=>{
        console.log(error);
    })

//routes
app.use("/api/workout",workoutRoutes)
app.use("/api/user",userRouter)



