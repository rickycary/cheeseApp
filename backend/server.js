
require("dotenv").config();
const mongoose = require("mongoose");
const { PORT = 3000, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

// Database Connection
console.log(DATABASE_URL)
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to Mongoose"))
    .on("close", () => console.log("You are disconnected from Mongoose"))
    .on("error", (error) => console.log(error))


app.get("/", (req, res) => {
    res.send("Welcome to the Backend");
});

app.listen(PORT, () => console.log(`You are now listening on port ${PORT}`));