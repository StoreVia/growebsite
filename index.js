const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

// Helper function to safely load JSON files
const loadJson = (fileName) => {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, "jsons", fileName), "utf8"));
    } catch (error) {
        console.error(`Error loading ${fileName}:`, error);
        return [];
    }
};

const dares = loadJson("dares.json");
const truth = loadJson("truth.json");
const fact = loadJson("fact.json");
const names = loadJson("names.json");

// Route handlers
const getRandomItem = (array) => array.length ? array[Math.floor(Math.random() * array.length)] : "No data available";

app.get("/dare", (req, res) => res.json({ dare: getRandomItem(dares) }));
app.get("/truth", (req, res) => res.json({ truth: getRandomItem(truth) }));
app.get("/fact", (req, res) => res.json({ fact: getRandomItem(fact) }));
app.get("/name", (req, res) => res.json({ name: getRandomItem(names) }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
