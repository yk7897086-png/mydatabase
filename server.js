const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB Connection String (Tera password aur database name add kar diya hai)
mongoose.connect("mongodb+srv://yashscet:Yash%402006@cluster0.qhnwihj.mongodb.net/database?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Schema aur Model setup [cite: 318, 323]
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model("Contact", contactSchema);

// Form Submit karne ka route [cite: 325]
app.post("/submit", async (req, res) => {
  const data = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  try {
    await data.save();
    res.send("<h1>Data Saved Successfully!</h1><a href='/'>Go Back</a>");
  } catch (err) {
    console.log(err);
    res.send("Error saving data to database.");
  }
});

// Server Start [cite: 340]
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});