const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Helper function to read JSON files safely
function readJSON(fileName) {
    try {
        return JSON.parse(fs.readFileSync(path.join(process.cwd(), "jsons", fileName), "utf8"));
    } catch (error) {
        console.error(`Error reading ${fileName}:`, error);
        return [];
    }
}

// Load JSON data
const dares = readJSON("dares.json");
const truth = readJSON("truth.json");
const fact = readJSON("fact.json");
const names = readJSON("names.json");

// Serve static files from the "public" folder
app.use(express.static(path.join(process.cwd(), "public")));

// Serve the main HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// API endpoints
app.get("/dare", (req, res) => res.json({ dare: dares[Math.floor(Math.random() * dares.length)] }));
app.get("/truth", (req, res) => res.json({ truth: truth[Math.floor(Math.random() * truth.length)] }));
app.get("/fact", (req, res) => res.json({ fact: fact[Math.floor(Math.random() * fact.length)] }));
app.get("/name", (req, res) => res.json({ name: names[Math.floor(Math.random() * names.length)] }));
app.get("/covid", async (req, res) => {
    const response = await fetch("https://disease.sh/v3/covid-19/all");
    const data = await response.json();
    res.json({
        cases: data.cases,
        deaths: data.deaths,
        recovered: data.recovered,
        todayCases: data.todayCases,
        todayDeaths: data.todayDeaths,
        active: data.active,
        critical: data.critical,
        casesPerOneMillion: data.casesPerOneMillion
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
