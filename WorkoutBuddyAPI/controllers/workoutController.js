const Workout = require("../models/workoutModel");
const Mongoose = require("mongoose");

// Create Workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read Workout
const readWorkout = async (req, res) => {
  const { id } = req.params;

  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: " No Such Workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  res.status(200).json(workout);
};

// Read Workouts
const readWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: " No Such Workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  res.status(200).json(workout);
};

// Delete Workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: " No Such Workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  readWorkout,
  readWorkouts,
  updateWorkout,
  deleteWorkout,
};
