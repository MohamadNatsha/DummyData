const router = require('express').Router();

router.get('/', (req,res) =>{
    res.send('test');
});

router.get('/:id', (req,res) =>{
    res.send('test');
});

router.get('/r', (req,res) =>{
    res.send('test');
});

module.exports = router;
