var path = require('path');
module.exports = {
    entry: './angular-mock-back.js',
    output: {
        path: path.resolve('tmp/bower-angular-mock-back'),
        filename: 'angular-mock-back.js',
        library: 'angularMockBack',
        libraryTarget: 'umd'
    }
};


