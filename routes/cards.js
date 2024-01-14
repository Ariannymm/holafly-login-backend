const express = require("express");
const router = express.Router();
const db = require("../db.json");

router.get("/:userId", (req, res) => {
   const userId = req.params.userId;
   const cards = db.cards.filter((card) => card.userId === +userId);

   return res.status(200).json({
       cards
   });
});

module.exports = router;