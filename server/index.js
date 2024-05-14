const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/db");

const app = express();

app.use(express());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "server is connected to port successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server successfully connected to port ${PORT}`);
  await dbConnect();
});
