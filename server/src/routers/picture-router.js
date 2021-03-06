const router = require('express').Router();
const controller = require('../controllers/picture-controller');

router.get(['/', '/r', '/random'], controller.randomPictureHandler);
router.get('/:id', controller.pictureHandler);

module.exports = router;
