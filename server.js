require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api/hooks.js");
const fs = require("fs");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

function writeFile(path, name) {
  fs.writeFile(path, api.get(name).data, (err) => {
    if (err) console.log("Ope! ", err);
    else console.log("File saved successfully");
  });
}

// function clearFiles() {
//   fs.readdir("files", (err, files) => {
//     if (err) throw err;
//     for (const file of files) {
//       console.log(file);
//       // fs.unlinkSync(`files/${file}`);
//     }
//   });
// }

app.get("/", async (req, res) => {
  const theme = req.query.theme || "black";
  const icons = api.all();
  const getIcon = (name) => api.get(name);
  res.render("index", { theme, icons, getIcon });
});

app.get("/api/icons", async (req, res) => {
  res.json(api.all());
});

app.get("/api/icons/:icon", async (req, res) => {
  const icon = req.params.icon;
  res.json(api.get(icon));
});

app.post("/api/icons/:icon/download", async (req, res) => {
  const name = req.params.icon;
  const path = `files/${name}.svg`;
  writeFile(path, name);
  setTimeout(() => res.download(path), 1000);
});

app.listen(process.env.PORT);
