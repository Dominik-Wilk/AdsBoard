const Ad = require('../models/Ad.model');

const authorMiddleware = async (req, res, next) => {
  try {
    const adv = await Ad.findById(req.params.id);
    if (
      adv &&
      req.session.user &&
      req.session.user.id === adv.user.toString()
    ) {
      next();
    } else {
      res
        .status(401)
        .send({ message: 'You are not the author of this advert' });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

module.exports = authorMiddleware;
