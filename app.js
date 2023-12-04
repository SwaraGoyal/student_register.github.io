const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Make the MongoDB connection URL configurable
const mongoDBUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/studentregistration";
mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/sign_up", function (req, res) {
  const {
    full_name,
    roll_number,
    email,
    birthdate,
    address,
    skills,
    interests,
    family_income,
    course_choice,
    post_college_plans,
  } = req.body;

  const data = {
    full_name,
    roll_number,
    email,
    birthdate,
    address,
    skills,
    interests,
    family_income,
    course_choice,
    post_college_plans,
  };

  db.collection("students").insertOne(data, function (err, collection) {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    console.log("Record inserted Successfully");
    return res.redirect('signup_success.html');
  });
});

app.get("/", function (req, res) {
  return res.redirect('index.html');
});

// Use dynamic port or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server listening at port ${PORT}`);
});
