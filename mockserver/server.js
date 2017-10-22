let express = require('express');    //引入express模块
let Mock = require('mockjs');        //引入mock模块
let fs = require('fs');				 // 引入文件模块
let bodyParser = require('body-parser');

//实例化express
let app = express();                
app.listen('8090');

// 添加 body-parser 中间是为了获取请求参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 为app添加中间件处理跨域请求
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


/**
 * 配置hello路由
 * @param  {[type]} req  [客户端发过来的请求所带数据]
 * @param  {[type]} res  [服务端的相应对象，可使用res.send返回数据，res.json返回json数据，res.down返回下载文件]
 */
app.get('/hello', function(req, res) {
    res.send('hello world');
});


/**
 * 配置test路由
 */
app.all('/test', function(req, res) {
    /**
     * mockjs中属性名‘|’符号后面的属性为随机属性，数组对象后面的随机属性为随机数组数量，正则表达式表示随机规则，+1代表自增
     */
	console.log(req.query.name); // 获取get参数
    res.json(Mock.mock({
        "status": 500,
		"message": "已经订阅",
        "data|1-9": [{
            "name|5-8": /[a-zA-Z]/,
            "id|+1": 1,
            "value|0-500": 20
        }]
    }));
});

/**
 * post提交
 */
app.post('/post', function(req, res) {
    /**
     * mockjs中属性名‘|’符号后面的属性为随机属性，数组对象后面的随机属性为随机数组数量，正则表达式表示随机规则，+1代表自增
     */
	console.log(req.body); // 获取post参数
    res.json(Mock.mock({
        "status": 200,
        "data|1-9": [{
            "name|5-8": /[a-zA-Z]/,
            "id|+1": 1,
            "value|0-500": 20
        }]
    }));
});


/**
 * 获取本地的json数据，如data.json文件则访问data.action
 * readdir读取目录下所有文件
 */
fs.readdir('./testData', function(err, files) {
    if(err) {
        console.log(err);
    } else {
        // 成功读取文件，取得文件名，拼接生成对应action，监听对应接口并返回对应文件数据
        files.forEach(function(v, i) {
            app.all(`/${v.replace(/json/, 'action')}`, function(req, res) {
                fs.readFile(`./testData/${v}`, 'utf-8', function(err, data) {
                    if(err) {
                        console.log(err);
                    } else {
                        res.json(Mock.mock(JSON.parse(data)));
                    }
                })
            })
        })
    }
})