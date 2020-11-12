const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

const databaseUrl = "FitnessTracker";
const collections = ["Workouts"];

const db = mongojs(databaseUrl, collections);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

db.on("error", error => {
    console.log("Database Error:", error);
});

//example 9

//API routes
app.post("/api/workouts", (req, res) => {
    body = req.body
    db.Workout.save(body, (err, data) => {
        if(err) {
            console.log(err)
        }
        else {
            res.send(data)
        }
    });
});

app.put("/api/workouts/:id", (req, res) => {

})

//HTML routes
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"))
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"))
});

app.listen(3000, () => {
    console.log("App running on port 3000!");
});
