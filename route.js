
const express = require('express')
const route = express.Router();
const Verify = require('./controllers/verify.controller')

route.post('/verify', Verify);

module.exports = route;