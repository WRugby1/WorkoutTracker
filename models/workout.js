const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutsSchema = new Schema({
  type: {
      type: String,
      required: "String is required"
  },
  name: {
      type: String
  },
  distance: {
      type: Number
  },
  weight: {
      type: Number
  },
  sets: {
      type: Number
  },
  reps: {
      type: Number
  },
  duration: {
      type: Number
  },

});

const Workout = mongoose.model("Workouts", workoutsSchema);

module.exports = Workout;