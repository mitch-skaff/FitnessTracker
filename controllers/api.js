const router = require("express").Router();
const Workout = require("../models/workout.js");

// pull info from db for the workouts page
router.get("/workouts", (req, res) => {
    Workout.aggregate([
        {
          $addFields: {
            "totalDuration":
            {
              $sum: "$exercises.duration"
            }
          }
        }
      ])
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
});

router.get("/workouts/range", (req, res) => {
    Workout.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
});

// route to submit new completed workouts
router.post("/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
});

// route to update mongodb exercise by id value 
router.put("/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercises: req.body } },
        { new: true })
        .then(data => { res.json(data); })
        .catch(err => { res.json(err); });
});

module.exports = router;