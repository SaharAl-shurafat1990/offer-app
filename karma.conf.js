module.exports = function (config) {
    'use strict';
    config.set({

        basePath: './',

        frameworks: ['mocha', 'chai','sinon'],

        files: [
            './client/app/lib/angular/angular.js',
            './client/app/lib/angular-route/angular-route.js',
            './client/app/lib/angular-mocks/angular-mocks.js',
            './client/app/services.js',
            './client/app/app.js',
            './client/app/account/*.js',
            './test/test.spec.js'
        ],

        reporters: ['spec'],

        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        browsers: ['PhantomJS']

    });
};