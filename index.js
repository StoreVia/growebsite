const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const dares = JSON.parse(fs.readFileSync("./jsons/dares.json"));
const truth = JSON.parse(fs.readFileSync("./jsons/truth.json"));
const fact = JSON.parse(fs.readFileSync("./jsons/fact.json"));
const names = JSON.parse(fs.readFileSync("./jsons/names.json"));

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/dare", (req, res) => res.json({ dare: dares[Math.random() * dares.length | 0] }));
app.get("/truth", (req, res) => res.json({ truth: truth[Math.random() * truth.length | 0] }));
app.get("/fact", (req, res) => res.json({ fact: fact[Math.random() * fact.length | 0] }));
app.get("/name", (req, res) => res.json({ name: names[Math.random() * names.length | 0] }));

app.listen(3000, () => console.log("Server running on port 3000"));
