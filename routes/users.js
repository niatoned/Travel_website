let User = require('../models/users').User;
let express = require('express');
let router = express.Router;

router.get('/login', async (req, res) => {
    resp.send(await Email.find());
})