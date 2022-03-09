const Brower = require('./brower');
async function newBrower(dataArr){
    //切割换行
    // let wrap = new RegExp(`r?/n`);
    
    //<img>里有两个属性分别是data-src和src，两个属性都有图片链接
    //原本只要匹配src取链接就可以，但是data-src是http链接，src是base64
    //所以只能同时将两个属性的src改为data-imgs

    //     原:data-src      原:src
    //得到data-data-imgs和data-imgs
    //最后再把带有http链接的data-data-imgs替换为src
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
            let result = await brower.getWantHtmlContent('#img-content');  //公众号的正文部分
            result = await brower.replaces(rules);  //替换
            result = await brower.fetchImageUrl(`<img[^>]+src=['"]([^'"]+)['"]+`);  //下载文章图片
            return result;
        })
    );
}
module.exports = {
    newBrower
}