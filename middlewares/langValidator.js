const db = require('../models');

const langValidator = async (req, res, next) => {
  const reqLang = req.body.lang;
  const lang = await db.Lang.findOne({langCode: reqLang});
  if (!lang) {
    return res.status(400).json({error: {message: 'Language not found'}});
  }
  return next();
};

module.exports = langValidator;
