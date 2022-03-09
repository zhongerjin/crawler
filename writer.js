var phantom = require('phantom');
const fs = require('fs');
const request = require('request');
function downImg(opts = {}, path = '') {
    return new Promise((resolve, reject) => {
        request
        .get(opts)
        .on('response', (response) => {
            console.log(`img type: ${response.headers['content-type']}`)
        })
        .pipe(fs.createWriteStream(path))
        .on('error', (e) => {
            console.log(`pipe error: ${e}`)
            reject(e);
        })
        .on('finish', () => {
            console.log('finish');
            resolve('ok');
        })
        .on('close', () => {
            console.log('close');
        })

    })
}

function mkdirFile(dir) {
    return new Promise((resolve, reject) => {
        if(!fs.existsSync(dir)) {
            fs.mkdir(dir, (error) => {
                (error)? reject(error): resolve(true);
            })
        }
        resolve(true);
    })
}
module.exports = {
    downImg,
    mkdirFile
}