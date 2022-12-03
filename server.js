require("dotenv").config();

var fs = require("fs");

const express = require("express");
const app = express();
const api = require("./api/hooks.js");
const data = require("./data/icons.js");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function writeFile(name) {
  fs.writeFile(`files/${name}.svg`, `${api.get(name).data}`);
}

function clearFiles() {
  fs.readdir("files", (err, files) => {
    console.log(files);
    if (err) throw err;
    for (const file of files) fs.unlinkSync(`files/${file}`);
  });
}

app.get("/data/icons.js", async (req, res) => res.status(200));

app.get("/", async (req, res) => {
  const theme = req.query.theme ?? "black";
  const icons = data;
  const getIcon = api.get;
  res.render("index", { theme, icons, getIcon });
});

app.get("/api/icons", async (req, res) => {
  res.json(data);
});

app.get("/api/icons/:icon", async (req, res) => {
  const icon = req.params.icon;
  res.json(api.get(icon));
});

app.post("/api/icons/:icon/download", async (req, res) => {
  const icon = req.params.icon;
  writeFile(icon);
  res.download(`files/${icon}.svg`);
});

app.listen(process.env.PORT);
