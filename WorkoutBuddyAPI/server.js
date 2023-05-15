const Express = require("express");
const Mongoose = require("mongoose");
const WorkoutRoute = require("./routes/workoutRoute");
const Dotenv = require("dotenv").config();
const cors = require('cors');

// Express App
const app = Express();

// Middleware
app.use(Express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Routes
app.use("/api/workouts", WorkoutRoute);

// Connect to DB
Mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;
