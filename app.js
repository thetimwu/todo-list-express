const express = require("express");
const getDate = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const items = ["first item"];
const workItems = [];

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({ name: "Welcome to your todolist" });

const item2 = new Item({ name: "Add something to your todolist" });

const defaultItems = [item1, item2];

app.get("/", (req, res) => {
  // const currentDay = getDate.getDate();
  // res.render("list", { listTitle: currentDay, items: items });
  Item.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      // console.log("found items successfully! ");
      if (docs.length === 0) {
        Item.insertMany(defaultItems, err => {
          if (err) {
            console.log(err);
          } else {
            console.log("items added successfully! ");
          }
        });
        res.redirect("/");
      } else {
        res.render("list", { listTitle: "TestDay", items: docs });
      }
    }
  });
});

app.post("/", (req, res) => {
  if (req.body.list === "WorkList") {
    // workItems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    const newItem = new Item({ name: req.body.newItem });
    newItem.save();
    // items.push(req.body.newItem);
    res.redirect("/");
  }
});

app.post("/delete", (req, res) => {
  const checkItemID = req.body.checkbox;
  Item.findByIdAndRemove({ _id: checkItemID }, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("items deleted successfully! ");
      res.redirect("/");
    }
  });
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "WorkList", items: workItems });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
