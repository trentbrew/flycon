const icons = require("../data/icons.js");

const all = () => icons;

const get = (name) => icons.filter((icon) => icon.name == name)[0];

const add = (icon) => icons.push(icon);

const remove = (name) => {
  return (index = icons.findIndex((icon) => icon.name == name));
};

module.exports = {
  all,
  get,
  add,
  remove,
};
