const express  = require("express")
const router = express.Router()
const  {
    createworkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutController");

router.get("/",getWorkouts);

//Get a single workout
router.get("/:id",getWorkout)
router.post("/",createworkout)
router.delete("/:id",deleteWorkout)
router.patch("/:id",updateWorkout)

module.exports = router;