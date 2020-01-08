const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser({ extended: true }));

app.get("/", (req, res) => {
  let today = new Date();
  let currentDay = today.getDay();
  //   console.log(currentDay);
  if (currentDay === 0 || currentDay === 6) {
    res.send("<h1>Weekend</h1>");
  } else {
    res.send("<h1>Working hard</h1>");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
