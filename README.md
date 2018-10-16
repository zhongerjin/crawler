# 为了解决生活中的需求，做了将一个将公众号文章爬下来并转成PDF的小玩具🙃

# 深知自己代码写的不怎么样，便多练练手💩

# Usage
目前还是手动将url给Copy下来，有些小麻烦，后续会完善的🐷

## 依赖项:wkhtmltopdf
原本使用版本是0.12.5
但莫名其妙就生成不出目录,于是就跑去issuse看
果然也有人遇到同样的问题

[TOC is not generated](https://github.com/wkhtmltopdf/wkhtmltopdf/issues/3953)

[Cannot create TOC (get outline instead)](https://github.com/wkhtmltopdf/wkhtmltopdf/issues/3995)

于是我就下载0.12.4啦🙃
[0.12.4](https://github.com/wkhtmltopdf/wkhtmltopdf/releases/tag/0.12.4)

## 需要注意的node-wkhtmltopdf
[node-wkhtmltopdf](https://github.com/devongovett/node-wkhtmltopdf/blob/master/README.md)

完成安装后，请确保wkhtmltopdf命令行工具位于PATH中。如果由于某种原因不想这样做
可以将require('wkhtmltopdf').command属性更改为wkhtmltopdf命令行工具的路径。
``` js
    const wkhtmltopdf = require('wkhtmltopdf')
    wkhtmltopdf.command = 'C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe';
```

目前先这样,这是最简陋最初始的版本,后续完善🙃
