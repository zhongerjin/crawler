const path = require('path');
const { exportHtml } = require('./topdf');
const brower = require('./brower');
const { newBrower } = require('./service');

(async function() {
  let article_arr = [
                  'https://mp.weixin.qq.com/s/mZeuVB6lpXQ1yKNULeG5tw',
                  'https://mp.weixin.qq.com/s/xoYQeUhNSxXhAc3_l9xRJA'
                  ];
  let result = [];

  result = [...await newBrower(article_arr)];
  const date = new Date();
  const toPadStart2 = str => str.padStart(2, '0');  //单位数补上0
  const outFileName = `${date.getFullYear()}${toPadStart2(`${date.getMonth() + 1}`)}${toPadStart2(`${date.getDate()}`)}
                      ${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`
  const outFile = path.join(__dirname, outFileName);
  await exportHtml(result.join(), outFile);
})();
