const Session = require('../models/Session.model');

const authMiddleware = async (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    try {
      const sessionRecord = await Session.findOne({});

      if (!sessionRecord)
        return res.status(401).send({ message: 'You are not authorized' });

      const sessionData = JSON.parse(sessionRecord.session);
      req.session.user = {
        id: sessionData.user.id,
        login: sessionData.user.login,
      };

      next();
    } catch (error) {
      return res.status(401).send({ message: 'You are not authorized' });
    }
  } else {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send('You are not authorised');
    }
  }
};

module.exports = authMiddleware;
