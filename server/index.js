const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/db");
const authRoute = require("./routes/authRoute");

const app = express();

app.use(express());
app.use(express.json());

app.use("/", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server successfully connected to port ${PORT}`);
  await dbConnect();
});
