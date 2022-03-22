const router = require('express').Router();
const controller = require('../controllers/image-controller');

router.get(['/', '/r', '/random'], controller.randomImageHandler);
router.get('/:id', controller.imageHandler);

module.exports = router;
