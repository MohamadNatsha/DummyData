const model = require('../models/image-model');
const router = require('express').Router();

router.post('/image', (req, res) => {
    /*
    inserting one image into the database
    body: {
        "url": "example.com/image/2",
        "tags": ["tag1", "tag2"]
    }
    */
    model.insertMany([{
        url: req.body.url,
        tags: req.body.tags
    }], function (err) {
        if (err) res.status(501).send();;
        res.status(201).send();
    });
});

router.post('/images', (req, res) => {
    /*
    inserting many images into the database
    body: {
        "images": [
            {
                "url": "example.com/image/2",
                "tags": ["tag1", "tag2"]
            },
            ...
        ]
    }
    */
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

router.put('/image/:id', (req,res) => {
    /*
    update image with id
    body: {
        "url": "example.com/image/2",
        "tags": ["tag1", "tag2"]
    }
    */
    Model.findOne({ _id: req.params.id }, (err, doc) => {
        if(err) {
            res.status(400).send();
        } else {
            doc.url = req.body.url;
            doc.tags = req.body.tags;
            doc.save();
            res.status(201).send();
        }
      });
});

router.delete('/image/:id', (req,res) => {
    /*
    delete image with id
    */
    Model.deleteOne({ _id: req.params.id }, (err) => {
        if(err) {
            res.status(400).send();
        } else {
            res.status(201).send();
        }
    });
});

module.exports = router;
