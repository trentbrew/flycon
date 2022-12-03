const icons = require("../data/icons.js");

const get = (name) => icons.filter((icon) => icon.name == name)[0];

const add = (icon) => icons.push(icon);

const remove = (name) => {
  return (index = icons.findIndex((icon) => icon.name == name));
};

module.exports = {
  get,
  add,
  remove,
};
