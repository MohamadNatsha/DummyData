const router = require('express').Router();

let defaultNumWords = 30;
let defaultMaxLength = 5;
let MIN_NUM_WORDS = 1;
let MAX_NUM_WORDS = 100;
let MIN_MAX_LENGTH = 2;
let MAX_MAX_LENGTH = 10;
let MAX_ID_LENGTH = 5;

function getRandomString(length)
{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getStringHash(s)
{
    let hash = 0;
    let b = 2;
    for(var i=0;i<s.length;i++)
    {
        hash += s[i].charCodeAt(0) * (Math.pow(b, s.length-1-i));
        hash = parseInt(hash);
    }
    return hash;
}

function selectText(isRandom, id, numWords, maxLength)
{
    if(isRandom)
        id = getRandomString(MAX_ID_LENGTH);

    // TODO: this has to be taken from the Database with (length <= maxLength)
    words = ["cat", "dog", "database", "video", "how",
    "general", "localization", "default", "pachage",
    "the", "there", "use", "be", "at", "would", "first",
    "each", "have", "been", "call", "do", "had", "its",
    "now", "time", "word", "list", "look", "number", 
    "said", "part", "these", "while", "wish", "large"];

    result = "";
    for(var i=0;i<numWords;i++)
    {
        if(i!=0)
            result += " ";
        
        result += words[getStringHash(id + i) % words.length];
    }
    return result;
}


router.get(['/', '/r', '/random'], (req,res) => {

    //extract numWords from query string
    let numWords = defaultNumWords;
    if(req.query.numwords)
    {
        numWords = parseInt(req.query.numwords);
        if(isNaN(numWords))
            numWords = defaultNumWords;
        if(numWords < MIN_NUM_WORDS)
            numWords = MIN_NUM_WORDS;
        if(numWords > MAX_NUM_WORDS)
            numWords = MAX_NUM_WORDS;
    }

    //extract maxLength from query string
    let maxLength = defaultMaxLength;
    if(req.query.maxlength)
    {
        maxLength = parseInt(req.query.maxlength);
        if(isNaN(maxLength))
            maxLength = defaultMaxLength;
        if(maxLength < MIN_MAX_LENGTH)
            maxLength = MIN_MAX_LENGTH;
        if(maxLength > MAX_MAX_LENGTH)
            maxLength = MAX_MAX_LENGTH;
    }

    res.send(selectText(true, -1, numWords, maxLength));
});

router.get('/:id', (req,res) =>{

    //extract numWords from query string
    let numWords = defaultNumWords;
    if(req.query.numwords)
    {
        numWords = parseInt(req.query.numwords);
        if(isNaN(numWords))
            numWords = defaultNumWords;
        if(numWords < MIN_NUM_WORDS)
            numWords = MIN_NUM_WORDS;
        if(numWords > MAX_NUM_WORDS)
            numWords = MAX_NUM_WORDS;
    }

    //extract maxLength from query string
    let maxLength = defaultMaxLength;
    if(req.query.maxlength)
    {
        maxLength = parseInt(req.query.maxlength);
        if(isNaN(maxLength))
            maxLength = defaultMaxLength;
        if(maxLength < MIN_MAX_LENGTH)
            maxLength = MIN_MAX_LENGTH;
        if(maxLength > MAX_MAX_LENGTH)
            maxLength = MAX_MAX_LENGTH;
    }

    //extract id from url parameters
    id = req.params.id;
    id = id.slice(0, MAX_ID_LENGTH);

    res.send(selectText(false, id, numWords, maxLength));
});

module.exports = router;
