const sharp = require('sharp'),
    videoModel = require('../models/video-model'),
    url = require('url');
const mediaManager = require('./media');

const defaultVid = 'local://videos/default.mp4';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {string}
 */
async function videoHandler(req, res) {
    let id = parseInt(req.params.id) != NaN ? parseInt(req.params.id) : undefined;

    // get the tags
    let tags = [];
    for (const element in req.query) {
        if (req.query[element] == "") {
            tags.push(element);
        }
    }

    // fetch video path
    let vidPath = await mediaManager.selectFilter(id, tags,videoModel);
    vidPath = vidPath != undefined?vidPath:defaultVid;
    // fetch image and resize it
    let stream = await mediaManager.getFile(vidPath);
    res.writeHead(200, {'Content-Type': 'video/mp4' });
    stream.pipe(res);
}

async function randomVideoHandler(req,res){
    let tags = [];
    for (const element in req.query) {
        if (req.query[element] == "") {
            tags.push(element);
        }
    }

    let x = await mediaManager.randomIndx(tags,videoModel);
    
    let newUrl = req.baseUrl + '/' + x;
    if(Object.keys(req.query).length > 0){
        newUrl += '?';
    }

    let rawQuery = url.parse(req.url).query?url.parse(req.url).query:"";
    newUrl += rawQuery;
    
    res.redirect(newUrl);
}


module.exports = {
    videoHandler,
    randomVideoHandler
}

