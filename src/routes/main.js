const router = require('express').Router();
const pic = require('./picture');
const video = require('./video');
const text = require('./text');

router.use('/p', pic);
router.use('/picture', pic);
router.use('/v', video);
router.use('/video', video);
router.use('/t', text);
router.use('/text', text);

module.exports = router;