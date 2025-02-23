const path = require("path");
const express = require("express");

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
