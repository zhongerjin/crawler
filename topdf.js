const fs = require('fs');
const wkhtmltopdf = require('wkhtmltopdf')
wkhtmltopdf.command = 'C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe';
function exportHtml(url, file, options) {
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