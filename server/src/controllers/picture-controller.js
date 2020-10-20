const fs = require('fs'),
    sharp = require('sharp'),
    { format } = require("sharp"),
    axios = require('axios'),
    request = require('request'),
    pictureModel = require('../models/picture-model');

const MaxImgWidth = 2048;
const MinImgWidth = 16;
const MaxImgHeight = 1500;
const MinImgHeight = 16;

const defaultImg = 'local://default.jpg';

/**
 * Get image by id and tage from database
 * @param {*} id 
 * @param {*} queryTags 
 * @returns {string}
 */
async function selectImage(id, queryTags) {
    let isRandom = id == undefined;
    let url;
    if (id >= 0) {
        // TODO: in case there was no tags fetch all
        // TODO: in case it was random skip randonly
        await pictureModel.aggregate([
            { $unwind: '$tags' },
            { $match: { tags: { $in: queryTags } } },
            { $project: { url: 1 } },
            { $skip: id },
            { $limit: 1 }
        ]).then((data) => {
            try {
                url = data[0].url
            } catch {
                url = defaultImg;
            }
        });
    }
    else {
        url = defaultImg;
    }

    return url;
}

/**
 * Get local image path
 * @param {*} path 
 * @returns {string}  
 */
function getLocalImg(path) {
    let mainPath = 'src/public/pictures';
    return fs.createReadStream(mainPath + path.substr(7));
}

/**
 * 
 * @param {*} path 
 * @param {*} width 
 * @param {*} height
 * @returns {string} 
 */
async function fetchImageAndResize(path, width, height) {
    let isLocal = path.substr(0, 8) == 'local://';
    let readStream;
    if (isLocal) {
        readStream = getLocalImg(path);
    } else {
        readStream = request.get(path);
    }

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
async function pictureHandler(req, res) {
    let width = parseInt(req.query.w) != NaN ? parseInt(req.query.w) : undefined;
    if (width != undefined) {
        width = Math.max(Math.min(MaxImgWidth, width), MinImgWidth);
    }

    let height = parseInt(req.query.h) != NaN ? parseInt(req.query.h) : undefined;
    if (height != undefined) {
        height = Math.max(Math.min(MaxImgHeight, height), MinImgHeight);
    }

    let id = parseInt(req.params.id) != NaN ? parseInt(req.params.id) : undefined;
    console.log(id);

    let tags = [];
    for (const element in req.query) {
        if (req.query[element] == "") {
            tags.push(element);
        }
    }

    let imgPath = await selectImage(id, tags);

    let stream = await fetchImageAndResize(imgPath, width, height);
    stream.pipe(res);
}

module.exports = {
    pictureHandler
}