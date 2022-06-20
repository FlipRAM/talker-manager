const express = require('express');
const middleware = require('../middlewares/index');

const router = express.Router();
const services = require('../services/talkerService');

router.get('', services.getTalkers);

router.get('/:id', services.getTalkerId);

router.post('',
  middleware.tokenVerification,
  middleware.nameMiddleware,
  middleware.ageMiddleware,
  middleware.talkMiddleware,
  middleware.ifTalk,
  services.addTalker);

router.put('/:id',
  middleware.tokenVerification,
  middleware.nameMiddleware,
  middleware.ageMiddleware,
  middleware.talkMiddleware,
  middleware.ifTalk,
  services.updateTalker);

router.delete('/:id', middleware.tokenVerification, services.deleteTalker);

module.exports = { router };