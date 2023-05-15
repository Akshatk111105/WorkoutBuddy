const express = require("express");
const {
  createWorkout,
  readWorkout,
  readWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// Create Workout
router.post("/", createWorkout);

// Read Workout
router.get("/:id", readWorkout);

// Read Workouts
router.get("/", readWorkouts);

// Update Workout
router.patch("/:id", updateWorkout);

// Delete Workout
router.delete("/:id", deleteWorkout);

module.exports = router;
