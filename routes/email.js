let Email = require('../models/emails').Email;
let uniquid = require('uniquid');
let express = require('express');
let router = express.Router;

router.get('/', async (req, res) => {
    resp.send(await Email.find());
})

router.post('/', async (req, res) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniquid(),
        name: reqBody.name,
        text: reqBody.text,
        email: reqBody.email,
        date: new date()
    })
    await newEmail.save();
    resp.send('accepted');
});
router.delete('/:id', async (req, res) => {
    await Email.deleteOne({ id: req.params.id });
    resp.send('deleted');
});

module.exports = router;

