const fs = require('fs');
const request = require('request');
/**
 * Get local image path
 * @param {*} path 
 * @returns {string}  
 */

function getLocalFile(path) {
    let mainPath = 'public';
    return fs.createReadStream(mainPath + path.substr(7));
}

async function selectFilter(id, queryTags, model) {
    let isRandom = id == undefined;
    let url;
    if (id >= 0) {
        let query = [];

        if(queryTags.length > 0){
            query.push({ $unwind: '$tags' });
            query.push({  $match: { tags: { $in: queryTags } } })
        }

        query.push({ $project: { url: 1 } },{ $skip: id },{ $limit: 1 });
        
        await model.aggregate(query).then((data) => {
            if(data.length > 0)
                url = data[0].url
        });
    }
    
    return url;
}

async function randomIndx(queryTags,model){
    // TODO: in case it was random skip randonly
    let rndResult = -1;
    let query = [];
    
    if(queryTags.length > 0){
        query.push({ $unwind: '$tags' });
        query.push({  $match: { tags: { $in: queryTags } } })
    }

    query.push({
        $count: "size"
    });

    await model.aggregate(query).then((data) => {
        if(data.length > 0)
            rndResult = Math.floor(Math.random() * Math.floor(data[0].size));
    });

    return rndResult;
}

function getFile(path){
    let isLocal = path.substr(0, 8) == 'local://';
    let readStream = isLocal?getLocalFile(path):request.get(path);
    return readStream;
}

module.exports = {
    getLocalFile,
    selectFilter,
    getFile,
    randomIndx
}