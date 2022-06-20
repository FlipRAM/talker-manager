const express = require('express');
const middleware = require('../middlewares/index');

const router = express.Router();
const services = require('../services/loginService');

router.post('', middleware.authMiddleware, services.createUser);

module.exports = { router };