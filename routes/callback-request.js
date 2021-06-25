let CallbackRequest = require('../models/callback-requests').CallbackRequest;
let uniquid = require('uniquid');
let express = require('express');
let router = express.Router;

router.get('/', async (req, res) => {
    resp.send(await CallbackRequest.find());
})

router.post('/', async (req, res) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniquid(),
        phoneNumber: reqBody.phoneNumber,
        date: new date()
    })
    await newRequest.save();
    resp.send('accepted');
});
router.delete('/:id', async (req, res) => {
    await CallbackRequest.deleteOne({id: req.params.id});
    resp.send('deleted');
});

module.exports = router;

