const Restaurant = require("./Restaurant");
const Menu = require("./Menu");
const Item = require("./Item");

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Menu.belongsToMany(Item, { through: "Menu_Item" });
Item.belongsToMany(Menu, { through: "Menu_Item" });

module.exports = { Restaurant, Menu, Item };