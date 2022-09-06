const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
