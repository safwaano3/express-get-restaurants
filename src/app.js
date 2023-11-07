const express = require("express");
const app = express();
const { Restaurant, Menu, Item } = require("../models/index");
const db = require("../db/connection");
const { check, validationResult } = require("express-validator");

app.use(express.json());
app.use(express.urlencoded());

app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll({
    include: [
      {
        model: Menu,
        include: [
          {
            model: Item,
          },
        ],
      },
    ],
  });
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id, {
    include: [
      {
        model: Menu,
        include: [
          {
            model: Item,
          },
        ],
      },
    ],
  });
  res.json(restaurant);
});

app.post(
  "/restaurants",
  [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    } else {
      await Restaurant.create({
        name: req.body.name,
        location: req.body.location,
        cuisine: req.body.cuisine,
      });
      const restaurants = await Restaurant.findAll();
      res.json(restaurants);
    }
  }
);

app.put("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  await restaurant.update({
    name: req.body.name,
    location: req.body.location,
    cuisine: req.body.cuisine,
  });
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

app.delete("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  await restaurant.destroy();
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

module.exports = app;