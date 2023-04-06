const express  = require("express")
const router = express.Router()
const requireAuth = require("../middleware/requireAuth")

const  {
    createworkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutController");

//require auth for all workout routes
router.use(requireAuth);

router.get("/",getWorkouts);

//Get a single workout
router.get("/:id",getWorkout)
router.post("/",createworkout)
router.delete("/:id",deleteWorkout)
router.patch("/:id",updateWorkout)

module.exports = router;