require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api/hooks.js");
const fs = require("fs");
const { request } = require("http");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

var downloading = false;

function writeFile(path, name) {
  fs.writeFile(path, api.get(name).data, (err) => {
    if (err) console.log("Ope! ", err);
  });
}

function clearFiles() {
  if (!downloading) {
    fs.readdir("files", (err, files) => {
      if (files) {
        if (err) throw err;
        for (const file of files) fs.unlinkSync(`files/${file}`);
      }
    });
  }
}

function filterData(query) {
  return query
    ? api
        .all()
        .filter(
          (icon) => icon.name.includes(query) || icon.tags.includes(query)
        )
    : api.all();
}

app.get("/debug", async (req, res) => {
  res.render("debug");
});

app.get("/icons", async (req, res) => {
  console.log("👋🏾");
  clearFiles();
  const query = req.query.q;
  const theme = req.query.theme || "black";
  const icons = api.all();
  const filtered = filterData(query);
  const getIcon = (name) => api.get(name);
  res.render("index", { theme, icons, getIcon, filtered, query });
});

app.get("/api/icons", async (req, res) => {
  res.json(api.all());
});

app.get("/api/icons/:icon", async (req, res) => {
  const icon = req.params.icon;
  res.json(api.get(icon));
});

app.post("/api/icons/:icon/download", async (req, res) => {
  downloading = true;
  const name = req.params.icon;
  const path = `files/${name}.svg`;
  writeFile(path, name);
  setTimeout(() => {
    res.download(path);
  }, 500);
  setTimeout(() => {
    downloading = false;
  }, 60000);
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
