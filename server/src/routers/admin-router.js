const model = require('../models/picture-model');
const router = require('express').Router();

router.post('/img', (req, res) => {
    model.insertMany([{
        url: req.body.url,
        tags: req.body.tags
    }], function (err) {
        if (err) res.status(501).send();;
        res.status(201).send();
    });
});

router.put('/img/:id', (req,res) => {
    
})

router.delete('/img/:id', (req,res) => {

});

module.exports = router;
