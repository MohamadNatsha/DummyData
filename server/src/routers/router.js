const router = require('express').Router(),
    imageRouter = require('./image-router'),
    videoRouter = require('./video-router'),
    textRouter = require('./text-router'),
    adminRouter = require('./admin-router'),
    gifRouter = require('./gif-router');

router.get('/', (req, res) => { res.json({ message: "Hello World !" }); });
router.use('/i', imageRouter);
router.use('/image', imageRouter);
router.use('/v', videoRouter);
router.use('/video', videoRouter);
router.use('/t', textRouter);
router.use('/text', textRouter);
router.use('/g', gifRouter);
router.use('/gif', gifRouter);
router.use('/admin', adminRouter);

module.exports = router;