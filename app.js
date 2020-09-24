const express = require("express");
const { projects } = require("./data.json");

const app = express();
// define where the static folder located
app.use("/static", express.static("public"));

// set the view engine to pug
app.set("view engine", "pug");

// handle http requests (get) and render the content
app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/projects", (req, res) => {
  res.render("project");
});
app.get("/projects/:id", (req, res) => {
  // get the id of the project by getting the value from the search params
  const { id } = req.params;
  res.render("project", { id, projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

// handle errors - 404
app.use((req, res, next) => {
  const err = new Error("Page has not been found.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error", err);
  console.log(`Status: ${err.status}`);
  console.log(`message: ${err.message}`);
});

app.listen(3000, console.log("server in on"));
