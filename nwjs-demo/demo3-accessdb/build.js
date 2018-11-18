var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    files: './**', // use the glob format
    platforms: ['osx64', 'win32', 'win64'],
    version: '0.14.7'
});

// Log stuff you want
nw.on('log', console.log);

nw.build().then(function () {
    console.log('all done!');
}).catch(function (error) {
    console.error(error);
});

// 运行
// nw.run().then(function () {
//     console.log('all done!');
// }).catch(function (error) {
//     console.error(error);
// });