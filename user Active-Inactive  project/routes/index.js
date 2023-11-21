const express = require('express');

const routes = express.Router();

routes.use('/signup',require('./v1/signupApi'));

routes.use('/Post', require('./v1/PostApi'));

module.exports = routes;