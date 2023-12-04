var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Make the MongoDB connection URL configurable
const mongoDBUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/studentregistration";
mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

var app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/sign_up", function (req, res) {
  const full_name = req.body.full_name;
  const roll_number = req.body.roll_number;
  const email = req.body.email;
  const birthdate = req.body.birthdate;
  const address = req.body.address;
  const skills = req.body.skills;
  const interests = req.body.interests;
  const family_income = req.body.family_income;
  const course_choice = req.body.course_choice;
  const post_college_plans = req.body.post_college_plans;

  var data = {
    full_name: full_name,
    roll_number: roll_number,
    email: email,
    birthdate: birthdate,
    address: address,
    skills: skills,
    interests: interests,
    family_income: family_income,
    course_choice: course_choice,
    post_college_plans: post_college_plans,
  };

  db.collection("students").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });

  return res.redirect("signup_success.html");
});

app.get("/", function (req, res) {
  res.set({
    "Access-control-Allow-Origin": "*",
  });
  return res.redirect("index.html");
});

// Use dynamic port or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server listening at port ${PORT}`);
});
