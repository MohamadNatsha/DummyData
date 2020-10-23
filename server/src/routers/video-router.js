const router = require('express').Router();
const controller = require('../controllers/video-controller');

router.get(['/', '/r', '/random'], controller.randomVideoHandler);
router.get('/:id', controller.videoHandler);

module.exports = router;
