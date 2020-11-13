const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Workout = require("./models/workout.js");

const PORT = process.env.PORT || 3000

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/FitnessTracker',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// API routes
app.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id)
    var body = req.body;
    db.Workout.findByIdAndUpdate(
        {
            _id: req.params.id
        },
        {
            $set: {
                exercises: [{
                    type: body.type,
                    name: body.name,
                    distance: body.distance,
                    weight: body.weight,
                    sets: body.sets,
                    reps: body.reps,
                    duration: body.duration
                }]
            }
        }
    ).then(data => {
        console.log(data);
        res.json(data);
    });
});

app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create({
        exercises: [{
            type: body.type,
            name: body.name,
            totalDuration: body.totalDuration,
            weight: body.weight,
            reps: body.reps,
            sets: body.sets,
            distance: body.distance
        }]
    })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
});

// //HTML routes
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"))
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"))
});

app.listen(PORT, () => {
    console.log(Workout)
    console.log("App running on port:" + PORT);
});
