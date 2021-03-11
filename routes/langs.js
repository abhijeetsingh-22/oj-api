const express = require('express');
const router = express.Router();
const db = require('../models');
router.get('/', async (req, res) => {
  const langs = await db.Lang.find();
  return res.status(200).json(langs);
});

module.exports = router;
