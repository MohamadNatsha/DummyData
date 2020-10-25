const router = require('express').Router();
const controller = require('../controllers/gif-controller');

router.get(['/', '/r', '/random'], controller.randomgifHandler);
router.get('/:id', controller.gifHandler);

module.exports = router;
