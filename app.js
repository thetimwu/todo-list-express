const express = require("express");
// const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let today = new Date();
  let currentDay = today.getDay();
  let day = "";

  switch (currentDay) {
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Fridayday";
      break;
    case 6:
    case 0:
      day = "Weekend";
      break;
    default:
      console.log(day);
  }

  res.render("list", { kindOfDay: day });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
