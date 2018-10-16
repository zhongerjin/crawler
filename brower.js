const phantom = require('phantom');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { downImg } = require('./downImg');

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
        let src_arr = [];
        let src_result = [];
        let temp;
        while((temp = patt.exec(this.result)) !== null){
            src_arr.push(temp[1]);
        }
        await Promise.all(src_arr.map(async (value, index) => {
            let options = {
                url: value
            };
            let folderName = this.$("#activity-name").text().trim();
            const dir = path.join(__dirname, `images`, folderName);
            fs.existsSync(dir)? null: fs.mkdir(dir);
            let paths = path.join(dir, `${index}.jpg`);
            await downImg(options, paths);
            // src_result.push({value, paths});
            this.result = this.result.replace(value, paths);
          })
        )
        return this.result;
    }
}