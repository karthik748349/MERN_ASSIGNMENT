const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));