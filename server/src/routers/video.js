const router = require('express').Router();

function selectVideo(isRandom, tags, id)
{
    // TODO:
    // if isRandom=true, change id to a valid id in the results space
    // now choose from the database the required video
    // after all, you need to return the url of the selected video
    
    return {isRandom: isRandom, id: id, tags: tags};//just for testing
}


router.get(['/', '/r', '/random'], (req,res) => {

    //extract tags from query string
    tags = [];
    for(let key in req.query)
    {
        if(key!="h" && key!="w")
            tags.push(key.trim());
    }

    res.send(selectVideo(true, tags, -1));
});

router.get('/:id', (req,res) =>{

    //extract tags from query string
    tags = [];
    for(let key in req.query)
    {
        if(key!="h" && key!="w")
            tags.push(key.trim());
    }

    //extract id from url parameters
    id = req.params.id;//maybe parse it to int

    res.send(selectVideo(false, tags, id));
});

module.exports = router;
