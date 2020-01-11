const express = require("express");
const getDate = require(__dirname + "/date.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.set("view engine", "ejs");

const items = ["first item"];
const workItems = [];

app.get("/", (req, res) => {
  const currentDay = getDate.getDate();
  res.render("list", { listTitle: currentDay, items: items });
});

app.post("/", (req, res) => {
  if (req.body.list === "WorkList") {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "WorkList", items: workItems });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
