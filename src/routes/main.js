const router = require('express').Router();
const pic = require('./picture');
const video = require('./video');
const text = require('./text');
const admin = require('./admin');

router.use('/p', pic);
router.use('/picture', pic);
router.use('/v', video);
router.use('/video', video);
router.use('/t', text);
router.use('/text', text);
router.use('/admin',admin);

module.exports = router;