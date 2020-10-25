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

router.post('/img/many', (req, res) => {
    let data = [];

    for(let i=0;i<req.body.images.length;i++)
    {
        data.push({
            url: req.body.images[i].url,
            tags: req.body.images[i].tags
        })
    }

    model.insertMany(data, function (err) {
        if (err) res.status(501).send();;
        res.status(201).send();
    });
    
});

router.put('/img/:id', (req,res) => {
    Model.findOne({ _id: req.params.id }, (err, doc) => {
        if(err) {
            res.status(400).send();
        } else {
            doc.url = req.body.url;
            doc.tags = req.body.tags;// for dataset preperation
            doc.save();
            res.status(201).send();
        }
      });
});

router.delete('/img/:id', (req,res) => {
    Model.deleteOne({ _id: req.params.id }, (err) => {
        if(err) {
            res.status(400).send();
        } else {
            res.status(201).send();
        }
    });// for dataset preperation
});



module.exports = router;
