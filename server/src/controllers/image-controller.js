const sharp = require('sharp'),
    imageModel = require('../models/image-model'),
    url = require('url');
const mediaManager = require('./media');

const MaxImgWidth = 2048;
const MinImgWidth = 16;
const MaxImgHeight = 1500;
const MinImgHeight = 16;

const defaultImg = 'local://images/default.jpg';

/**
 *
 * @param {*} path 
 * @param {*} width 
 * @param {*} height
 * @returns {string} 
 */
async function fetchImageAndResize(path, width, height) {
    let readStream = await mediaManager.getFile(path);
        
    let transform = sharp();
    if (width || height) {
        transform = transform.resize(width, height);
    }

    return readStream.pipe(transform);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {string}
 */
async function imageHandler(req, res) {
    let width = parseInt(req.query.w);
    width = isNaN(width) ? undefined : width;
    if (width != undefined) {
        width = Math.max(Math.min(MaxImgWidth, width), MinImgWidth);
    }

    let height = parseInt(req.query.h);
    height = isNaN(height) ? undefined : height;
    if (height != undefined) {
        height = Math.max(Math.min(MaxImgHeight, height), MinImgHeight);
    }

    let id = parseInt(req.params.id) != NaN ? parseInt(req.params.id) : undefined;

    // get the tags
    let tags = [];
    for (const element in req.query) {
        if (req.query[element] == "") {
            tags.push(element);
        }
    }

    // fetch img path
    let imgPath = await mediaManager.selectFilter(id, tags,imageModel);
    imgPath = imgPath != undefined?imgPath:defaultImg;

    // fetch image and resize it
    let stream = await fetchImageAndResize(imgPath, width, height);
    stream.pipe(res);
}

async function randomImageHandler(req,res){
    let tags = [];
    for (const element in req.query) {
        if (req.query[element] == "") {
            tags.push(element);
        }
    }

    let x = await mediaManager.randomIndx(tags,imageModel);
    
    let newUrl = req.baseUrl + '/' + x;
    if(Object.keys(req.query).length > 0){
        newUrl += '?';
    }

    let rawQuery = url.parse(req.url).query?url.parse(req.url).query:"";
    newUrl += rawQuery;
    
    res.redirect(newUrl);
}

module.exports = {
    imageHandler,
    randomImageHandler
}

