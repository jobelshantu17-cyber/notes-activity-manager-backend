const express = require("express");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes")

const app = express();

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/notes", noteRoutes);


app.get("/health", (req, res) => {
    res.status(200).send("Server is running")
});

module.exports = app;