require("dotenv").config();

const express = require("express");
const app = express();

const data = require("./data/icons.js");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const icons = data.icons;
  res.render("index", { icons });
});

app.get("/api/icons", async (req, res) => {
  res.json(data.icons);
});

app.get("/api/icons/:icon", async (req, res) => {
  const icon = req.params.icon;
  res.json({ [icon]: data.icons[icon] });
});

app.listen(process.env.PORT);
