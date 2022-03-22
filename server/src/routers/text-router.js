const router = require('express').Router();
const controller = require('../controllers/text-controller');

router.get(['/', '/r', '/random'], controller.randomTextHandler);
router.get('/:id', controller.textHandler);

module.exports = router;
