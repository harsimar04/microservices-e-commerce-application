const express = require("express");
const router = express.Router();
const dbo = require("../db/conn");

// GET DEALS
router.get("/deals", async (req, res) => {
  try {
    const db = dbo.getDb();
    const deals = await db.collection("deals").find({}).toArray();
    res.status(200).json(deals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});

// GET PRODUCTS
router.get("/products", async (req, res) => {
  try {
    const db = dbo.getDb();

    const products = await db
      .collection("products")
      .find({})
      .toArray();

    res.status(200).json(products);
  } catch (err) {
    console.error("Products API error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


module.exports = router;

