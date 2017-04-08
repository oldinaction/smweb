document.write('It works.')
document.write(require('./lib/module.js')) // 添加模块

var $ = require("jquery")
$("<div>这是jquery生成的</div>").appendTo("body")
