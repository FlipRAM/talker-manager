const express = require('express');
// const middleware = require('../middlewares/index');
const router = express.Router();
const services = require('../services/talkerService');

router.get('', services.getTalkers);
router.get('/:id', services.getTalkerId);

module.exports = { router };