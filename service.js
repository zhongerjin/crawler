const Brower = require('./brower');
async function newBrower(dataArr){
    //切割换行
    // let wrap = new RegExp(`r?/n`);
    const rules = {
        'src': 'data-imgs',
        'data-data-imgs': 'src',
        'crossorigin="anonymous"': '',
    };
    let result = [];
    return await Promise.all(
        dataArr.map(async (value) => {
            const brower = new Brower();
            const content = await brower.openPage(value);
            let result = await brower.getWantHtmlContent("#img-content");
            result = await brower.replaces(rules);
            result = await brower.fetchImageUrl(`<img[^>]+src=['"]([^'"]+)['"]+`);
            return result;
        })
    );
}
module.exports = {
    newBrower
}