// DEPENDENCIES 
require("dotenv").config();
const { PORT = 3000, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// DATABASE CONNECTION
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
// CONNECTION EVENTS
mongoose.connection
    .on("open", () => console.log("You are connected to Mongoose"))
    .on("close", () => console.log("You are disconnected from Mongoose"))
    .on("error", (error) => console.log(error))

// MODELS
const CheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String
});

const Cheese = mongoose.model("Cheese", CheeseSchema);

// MIDDLEWARE
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Welcome to the Backend");
});

// CHEESE ROUTES //INDUCES
// INDEX Route
app.get("/Cheese", async (req,res) => {
    try {
        res.json(await Cheese.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Create Route
app.post("/Cheese", async (req, res) => {
    try {
        res.json(await Cheese.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
})


app.listen(PORT, () => console.log(`You are now listening on port ${PORT}`));