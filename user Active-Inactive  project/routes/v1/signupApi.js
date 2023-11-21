const express = require('express');

const routes = express.Router();

const jwt = require('jsonwebtoken');

const SECRET_KEY = "node";

const logiontroller = require('../../controller/signupController');

routes.post('/signupData', logiontroller.signupData);

routes.post('/signinData', logiontroller.signinData);

module.exports = routes;