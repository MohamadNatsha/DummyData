const router = require('express').Router(),
    pic = require('./picture-router'),
    video = require('./video-router'),
    text = require('./text-router'),
    admin = require('./admin-router'),
    gif = require('./gif-router');
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
router.use('/g', gif);
router.use('/gif', gif);
router.use('/admin', admin);

module.exports = router;