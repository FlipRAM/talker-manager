const express = require('express');
// const middleware = require('../middlewares/index');
const talkerRouter = express.Router();
const services = require('../services/talkerService');

talkerRouter.get('', services.getTalkers);
talkerRouter.get('/:id', services.getTalkerId);

module.exports = { talkerRouter };