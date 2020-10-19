const router = require('express').Router();
const controller = require('../controllers/picture');

router.get(['/', '/r', '/random'], controller.pictureHandler);
router.get('/:id', controller.pictureHandler);

module.exports = router;
