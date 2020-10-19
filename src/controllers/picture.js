const fs = require('fs');
const sharp = require('sharp');
const { format } = require("sharp");
const axios = require('axios');
const request = require('request');

const MaxImgWidth = 2048;
const MinImgWidth = 16;
const MaxImgHeight = 1500;
const MinImgHeight = 16;

function selectImage(id,tags)
{
    let isRandom = id == undefined;
    // TODO:
    // if isRandom=true, change id to a valid id in the results space
    // now choose from the database the required image
    // after all, you need to return the url of the selected image
    // in case local
    // return 'local://default.jpg';
    return 'https://images.unsplash.com/photo-1541336528065-8f1fdc435835?ixlib=rb-1.2.1&auto=format&fit=crop&w=1750&q=80';
}

function getLocalImg(path){
    let mainPath = 'src/public/pictures';
    return fs.createReadStream(mainPath + path.substr(7));
}

async function fetchImageAndResize(path, format, width, height) {
    let isLocal = path.substr(0,8) == 'local://';
    let readStream;
    if(isLocal){
        readStream = getLocalImg(path);
    }else{
        readStream = request.get(path);
    }

    let transform = sharp()
  
    if (format) {
      transform = transform.toFormat(format)
    }
  
    if (width || height) {
      transform = transform.resize(width, height)
    }
  
    return readStream.pipe(transform)
}

async function pictureHandler(req,res) {
    let width = parseInt(req.query.w) != NaN?parseInt(req.query.w):undefined;
    if(width != undefined){
        width = Math.max(Math.min(MaxImgWidth,width),MinImgWidth);
    }

    let height = parseInt(req.query.h) != NaN?parseInt(req.query.h):undefined;
    if(height != undefined){
        height = Math.max(Math.min(MaxImgHeight,height),MinImgHeight);
    }

    let id = parseInt(req.param.id) != NaN?parseInt(req.param.id):undefined;
    if(id != undefined){
        id = Math.max(id,0);
    }

    let tags = [];
    for (const element in req.query) {
        if(req.query[element] == ""){
            tags.push(element);
        }
    }

    let imgPath = selectImage(id,tags);
    res.type('image/jpg');

    let stream = await fetchImageAndResize(imgPath, 'jpg', width, height);
    stream.pipe(res);
}

module.exports = {
    pictureHandler
}