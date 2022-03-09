const fs = require('fs');
const path = require('path')
const wkhtmltopdf = require('wkhtmltopdf')
wkhtmltopdf.command = 'C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe';
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
    'footer-center': '[page]',
    encoding: 'UTF-8',
    disableSmartShrinking: true,
    xslStyleSheet: xsl_dir,
    // javascriptDelay: 10000 // to avoid: Warning: Received createRequest signal on a disposed ResourceObject's NetworkAccessManager. This might be an indication of an iframe taking too long to load.
  }
function exportHtml(url, file) {
	return new Promise((resolve, reject) => {
		wkhtmltopdf(url, options, (err, stream) => {
			if (err) {
				reject(err);
			} else {
				stream.pipe(fs.createWriteStream(file));
				resolve();
			}
		});
	});
}
module.exports = {
	exportHtml
}