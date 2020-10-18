const router = require('express').Router();

let defaultWidth = 1024;
let defaultHeight = 768;
let MIN_WIDTH = 50;
let MAX_WIDTH = 2000;
let MIN_HEIGHT = 50;
let MAX_HEIGHT = 2000;
function getWidthAndHeight(query)
{
    let minWidth = defaultWidth;
    let maxWidth = defaultWidth;
    let minHeight = defaultHeight;
    let maxHeight = defaultHeight;
    if(query.w)// if(exist and not empty)
    {
        //take width values from query string
        let widthsList = query.w.split(',').slice(0, 2);
        //maybe take max 3 values, the 3rd value as the prefered width
        for(var i=0;i<widthsList.length;i++)
            widthsList[i] = widthsList[i].trim();


        //convert them to integers
        if(widthsList.length > 0)
        {
            widthsList[0] = parseInt(widthsList[0]);
            if(isNaN(widthsList[0]))
                widthsList[0] = defaultWidth;
            if(widthsList[0] < MIN_WIDTH)
                widthsList[0] = MIN_WIDTH;
            if(widthsList[0] > MAX_WIDTH)
                widthsList[0] = MAX_WIDTH;
        }
        if(widthsList.length>1)
        {
            widthsList[1] = parseInt(widthsList[1]);
            if(isNaN(widthsList[1]))
                widthsList[1] = defaultWidth;
            if(widthsList[1] < MIN_WIDTH)
                widthsList[1] = MIN_WIDTH;
            if(widthsList[1] > MAX_WIDTH)
                widthsList[1] = MAX_WIDTH;
            if(widthsList[1] < widthsList[0])
                widthsList[1] = widthsList[0];
        }
        
        if(widthsList.length==1)
        {
            minWidth = widthsList[0];
            maxWidth = widthsList[0];
        }
        else if(widthsList.length==2)
        {
            minWidth = widthsList[0];
            maxWidth = widthsList[1];
        }
    }
    if(query.h)// if(exist and not empty)
    {
        //take height values from query string
        let heightsList = query.h.split(',').slice(0, 2);
        //maybe take max 3 values, the 3rd value as the prefered height
        for(var i=0;i<heightsList.length;i++)
            heightsList[i] = heightsList[i].trim();


        //convert them to integers
        if(heightsList.length > 0)
        {
            heightsList[0] = parseInt(heightsList[0]);
            if(isNaN(heightsList[0]))
                heightsList[0] = defaultWidth;
            if(heightsList[0] < MIN_HEIGHT)
                heightsList[0] = MIN_HEIGHT;
            if(heightsList[0] > MAX_HEIGHT)
                heightsList[0] = MAX_HEIGHT;
        }
        if(heightsList.length>1)
        {
            heightsList[1] = parseInt(heightsList[1]);
            if(isNaN(heightsList[1]))
                heightsList[1] = defaultWidth;
            if(heightsList[1] < MIN_HEIGHT)
                heightsList[1] = MIN_HEIGHT;
            if(heightsList[1] > MAX_HEIGHT)
                heightsList[1] = MAX_HEIGHT;
            if(heightsList[1] < heightsList[0])
                heightsList[1] = heightsList[0];
        }
        
        if(heightsList.length==1)
        {
            minHeight = heightsList[0];
            maxHeight = heightsList[0];
        }
        else if(heightsList.length==2)
        {
            minHeight = heightsList[0];
            maxHeight = heightsList[1];
        }
    }

    return {minWidth: minWidth, maxWidth: maxWidth, minHeight: minHeight, maxHeight, maxHeight};
}

function selectImage(isRandom, tags, id, minWidth, maxWidth, minHeight, maxHeight)
{
    // TODO:
    // if isRandom=true, change id to a valid id in the results space
    // now choose from the database the required image
    // after all, you need to return the url of the selected image
    
    return {isRandom: isRandom, id: id, tags: tags, minWidth: minWidth, maxWidth: maxWidth,
        minHeight: minHeight, maxHeight: maxHeight};//just for testing
}


router.get(['/', '/r', '/random'], (req,res) => {

    //extract widths and heighs from query string
    sizeResult = getWidthAndHeight(req.query);

    //extract tags from query string
    tags = [];
    for(let key in req.query)
    {
        if(key!="h" && key!="w")
            tags.push(key.trim());
    }

    res.send(selectImage(true, tags, -1, sizeResult.minWidth, sizeResult.maxWidth, sizeResult.minHeight, sizeResult.maxHeight));
});

router.get('/:id', (req,res) =>{

    //extract widths and heighs from query string
    sizeResult = getWidthAndHeight(req.query);

    //extract tags from query string
    tags = [];
    for(let key in req.query)
    {
        if(key!="h" && key!="w")
            tags.push(key.trim());
    }

    //extract id from url parameters
    id = req.params.id;//maybe parse it to int

    res.send(selectImage(false, tags, id, sizeResult.minWidth, sizeResult.maxWidth, sizeResult.minHeight, sizeResult.maxHeight));
});

module.exports = router;
