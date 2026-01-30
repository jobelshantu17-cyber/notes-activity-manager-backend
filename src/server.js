require('dotenv').config();

const app = require("./app.js");
const connectDB = require("./config/db.js");

const PORT = process.env.PORT || 5000;

//Connect database first
connectDB();

app.listen(3001, "0.0.0.0", () => {
  console.log("Server running on http://127.0.0.1:3001");
});

