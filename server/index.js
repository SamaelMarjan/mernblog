const express = require("express");

const app = express();

app.use(express());

app.get("/", (req, res) => {
  res.status(200).send({ message: "server is connected to port successfully" });
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is connected to port ${PORT}`));
