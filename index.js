const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(process.cwd(), "public")));

// Read JSON data
const dares = JSON.parse(fs.readFileSync("./jsons/dares.json"));
const truth = JSON.parse(fs.readFileSync("./jsons/truth.json"));
const fact = JSON.parse(fs.readFileSync("./jsons/fact.json"));
const names = JSON.parse(fs.readFileSync("./jsons/names.json"));

// Routes to fetch random data
app.get("/dare", (req, res) => res.json({ dare: dares[Math.floor(Math.random() * dares.length)] }));
app.get("/truth", (req, res) => res.json({ truth: truth[Math.floor(Math.random() * truth.length)] }));
app.get("/fact", (req, res) => res.json({ fact: fact[Math.floor(Math.random() * fact.length)] }));
app.get("/name", (req, res) => res.json({ name: names[Math.floor(Math.random() * names.length)] }));

// Serve the frontend page
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
