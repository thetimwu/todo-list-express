const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.set("view engine", "ejs");

let items = ["first item"];

app.get("/", (req, res) => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  let today = new Date();

  let currentDay = today.toLocaleDateString("en-us", options);

  res.render("list", { kindOfDay: currentDay, items: items });
});

app.post("/", (req, res) => {
  console.log(req.body.newItem);
  items.push(req.body.newItem);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
