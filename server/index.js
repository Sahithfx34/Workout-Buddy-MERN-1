const express = require("express");
const app = express();
const workoutRoutes = require("./routes/workout")
const mongoose = require("mongoose");
require("dotenv").config();



//middleware
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(3000,()=>{
            console.log("Successfully Running on port 3000");
        })    
    }).catch((error)=>{
        console.log(error);
    })

//routes
app.use("/api/workout",workoutRoutes)



