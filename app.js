const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.get("/", function(req ,res)
{
  const day = date.getDate();
  res.render("list",{nameOfDay:day, listItems:items});
});

app.post("/", function(req, res)
{
  if(req.body.button=== "Work List")
  {
    workItems.push(req.body.listItem);
    res.redirect("/work");
  }
  else
  {
  items.push(req.body.listItem);
  res.redirect("/");
  }
});

app.get("/work", function(req, res)
{
  res.render("list", {nameOfDay:"Work List", listItems:workItems});
});

app.get("/about", function(req, res)
{
  res.render("about");
});

app.listen(3000, function()
{
  console.log("Server has started on port 3000.")
})
