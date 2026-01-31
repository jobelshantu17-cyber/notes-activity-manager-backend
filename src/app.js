const express = require("express");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const activityRoutes = require("./routes/activityRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/notes", noteRoutes);
app.use("/api/activities", activityRoutes)
app.use(errorHandler);


app.get("/health", (req, res) => {
    res.status(200).send("Server is running")
});

module.exports = app;