const model = require('../models/picture-model');
const router = require('express').Router();

router.post('/img/add', (req, res) => {
    model.insertMany([{
        url: req.body.url,
        tags: req.body.tags
    }], function (err) {
        if (err) res.status(501).send();;
        res.status(201).send();
    });
});

module.exports = router;
