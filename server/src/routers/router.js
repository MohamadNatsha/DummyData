const router = require('express').Router(),
    pic = require('./picture'),
    video = require('./video'),
    text = require('./text'),
    admin = require('./admin');

//just for testing
router.get('/', (req, res) => {
    res.json({
        message: "Hello World From Express"
    })
});
//Router's
router.use('/p', pic);
router.use('/picture', pic);
router.use('/v', video);
router.use('/video', video);
router.use('/t', text);
router.use('/text', text);
router.use('/admin', admin);

module.exports = router;