const phantom = require('phantom');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { downImg, mkdirFile } = require('./writer');
const imagesName = 'images';  //图片文件夹名字

module.exports = class Brower{
    constructor(){
        this.instance = undefined;
        this.page = undefined;
        this.content = undefined;
        this.result = undefined;
        this.$ = undefined;
    }
    async openPage(url){
        this.instance = await phantom.create();
        this.page = await this.instance.createPage();
        const status = await this.page.open(url);
        this.content = await this.page.property('content');
        await this.instance.exit();
        return this.content;
    }
    async getWantHtmlContent(want){
        this.$ = cheerio.load(this.content, { decodeEntities: false });
        this.result = this.$(want).html().trim();
        return this.result;
    }
    async replaces(replaces){
        let replace_result = this.result;
        let Iteration = Object.entries(replaces);
        let Iteration_len = Iteration.length;
        for(let i = 0; i < Iteration_len; i++){
            let regExp = new RegExp(Iteration[i][0], 'g');
            replace_result = replace_result.replace(regExp, Iteration[i][1]);
        }
        this.result = replace_result;
        replace_result = undefined;
        return this.result;
    }
    async fetchImageUrl(regExp){
        // const patt = /<img[^>]+src=['"]([^'"]+)['"]+/g;
        const patt = new RegExp(regExp, 'g');
        let srcList = [];
        // let src_result = [];
        let existFolder = [];
        let temp;
        //获取所有图片链接
        while((temp = patt.exec(this.result)) !== null){
            srcList.push(temp[1]);
        }
        //新建图片文件夹
        const imagesFolder = path.join(__dirname, imagesName);
        await mkdirFile(imagesFolder)

        await Promise.all(srcList.map(async (value, index) => {
            let options = {
                url: value
            };
            const articleFolderName = this.$('#activity-name').text().trim();  //文章标题
            const articleFolderDir = path.join(imagesFolder, articleFolderName);  //文章文件夹的目录

            if(!existFolder.includes(articleFolderName)){
                existFolder.push(articleFolderName);
                await mkdirFile(articleFolderDir);
            }

            const articleImageDir = path.join(articleFolderDir, `${index}.jpg`);
            await downImg(options, articleImageDir);  //下载图片
            // src_result.push({value, articleImageDir});
            this.result = this.result.replace(value, articleImageDir);  //将<img>原本中的图片路径改为本地
          })
        )
        return this.result;
    }
}