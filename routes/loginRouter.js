const express = require('express');
// const middleware = require('../middlewares/index');
const router = express.Router();
const services = require('../services/loginService');

router.post('', services.createUser);

module.exports = { router };