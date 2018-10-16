const path = require('path');
const { exportHtml } = require('./topdf');
const brower = require('./brower');
const { newBrower } = require('./service');

(async function() {
  let result = [];
  let src_arr = ['https://mp.weixin.qq.com/s/rreH3DsirOQVfc8Q9H2nhQ','https://mp.weixin.qq.com/s/k4cUnSqV0hVgOWpBi6SWGw'];
  result = [].concat(await newBrower(src_arr));
  let xsl_dir = path.join(__dirname, `main.xsl`);
  const options = {
    // dpi,
    s:'A4',
    pageSize: 'letter',
    ignore: [
      /QFont::setPixelSize/,
      /Warning: Received createRequest signal/,
      /SSL/
    ],
    toc:true,
    debug: true,
    "footer-center": "[page]",
    encoding: 'UTF-8',
    disableSmartShrinking: true,
    xslStyleSheet: xsl_dir,
    javascriptDelay: 10000 // to avoid: Warning: Received createRequest signal on a disposed ResourceObject's NetworkAccessManager. This might be an indication of an iframe taking too long to load.
  }
  const outFile = path.join(__dirname, `out.pdf`);
  await exportHtml(result.join(), outFile);
})();
