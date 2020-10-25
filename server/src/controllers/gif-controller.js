const gifModel = require('../models/gif-model'),
    url = require('url');
const mediaManager = require('./media');

const defaultGif = 'local://gifs/default.gif';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {string}
 */
async function gifHandler(req, res) {
    let id = parseInt(req.params.id) != NaN ? parseInt(req.params.id) : undefined;

    // get the tags
    let tags = [];
    for (const element in req.query) {
        if (req.query[element] == "") {
            tags.push(element);
        }
    }

    // fetch video path
    let gifPath = await mediaManager.selectFilter(id, tags,gifModel);
    gifPath = gifPath != undefined?gifPath:defaultGif;
    // fetch image and resize it
    let stream = await mediaManager.getFile(gifPath);
    res.writeHead(200, {'Content-Type': 'image/gif' });
    stream.pipe(res);
}

async function randomgifHandler(req,res){
    let tags = [];
    for (const element in req.query) {
        if (req.query[element] == "") {
            tags.push(element);
        }
    }

    let x = await mediaManager.randomIndx(tags,gifModel);
    
    let newUrl = req.baseUrl + '/' + x;
    if(Object.keys(req.query).length > 0){
        newUrl += '?';
    }

    let rawQuery = url.parse(req.url).query?url.parse(req.url).query:"";
    newUrl += rawQuery;
    
    res.redirect(newUrl);
}


module.exports = {
    gifHandler,
    randomgifHandler
}

