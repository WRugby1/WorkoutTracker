const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutsSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    exercises: [{
        type: {
            type: String,
            required: true
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
        }
    }]
});

const Workout = mongoose.model("Workout", workoutsSchema);

module.exports = Workout;