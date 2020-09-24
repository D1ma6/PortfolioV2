const express = require("express");
const { projects } = require("./data.json");

const app = express();
app.use("/static", express.static("public"));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/projects", (req, res) => {
  res.render("project");
});
app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  res.render("project", { id, projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

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
