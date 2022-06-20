const authMiddleware = require('./authMiddleware');
const errorMiddleware = require('./errorMiddleware');
const tokenVerification = require('./tokenVerification');
const { nameMiddleware, ageMiddleware, talkMiddleware, ifTalk } = require('./talkerMiddleware');

module.exports = {
  authMiddleware,
  errorMiddleware,
  tokenVerification,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  ifTalk,
};