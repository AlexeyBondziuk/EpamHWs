// Karma configuration
// Generated on Tue Jul 13 2021 13:37:15 GMT+0300 (Восточная Европа, летнее время)
const path = require('path')
const webpackConfig = require("./webpack.config");
// const HTMLWebpackPlugin = require('html-webpack-plugin')
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const webpack = require("webpack");



module.exports = function(config) {
  config.set({

    //root path location to resolve paths defined in files and exclude
    basePath: '',
    //files/patterns to exclude from loaded files
    exclude: [],
    //files/patterns to load in the browser
    files: [
      { pattern: 'tests/*.js', watched: true, served: true, included: true, type: 'module' },
      // { pattern: 'src/js/*.js', watched: true, served: true, included: true, type: 'module' },

      /*parameters:
          watched: if autoWatch is true all files that have set watched to true will be watched for changes
          served: should the files be served by Karma's webserver?
          included: should the files be included in the browser using <script> tag?
          nocache: should the files be served from disk on each request by Karma's webserver? */
      /*assets:
          {pattern: '*.html', watched:true, served:true, included:false}
          {pattern: 'images/*', watched:false, served:true, included:false} */
    ],
    //executes the tests whenever one of watched files changes
    autoWatch: true,
    //if true, Karma will run tests and then exit browser
    singleRun: false,
    //if true, Karma fails on running empty tests-suites
    failOnEmptyTestSuite: false,
    //reduce the kind of information passed to the bash
    logLevel: config.LOG_WARN, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG

    //list of frameworks you want to use, only jasmine is installed with this boilerplate
    frameworks: ['jasmine', 'mocha', 'webpack'],
    plugins: [
      'karma-webpack',
      'karma-coverage',
      'karma-jasmine',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter',
      'karma-jasmine-html-reporter',
      'karma-chrome-launcher',
       'karma-spec-reporter',
      'karma-coverage-istanbul-reporter',
      'karma-verbose-reporter'
    ],
    //list of browsers to launch and capture
    browsers: ['Chrome'/*,'PhantomJS','Firefox','Edge','ChromeCanary','Opera','IE','Safari'*/],
    //list of reporters to use
    reporters: ['mocha', 'kjhtml', 'coverage', 'spec', 'verbose', 'coverage-istanbul', /*,'dots','progress',*/],

    //address that the server will listen on, '0.0.0.0' is default
    listenAddress: '0.0.0.0',
    //hostname to be used when capturing browsers, 'localhost' is default
    hostname: 'localhost',
    //the port where the web server will be listening, 9876 is default
    port: 9876,
    //when a browser crashes, karma will try to relaunch, 2 is default
    retryLimit: 0,
    //how long does Karma wait for a browser to reconnect, 2000 is default
    browserDisconnectTimeout: 5000,
    //how long will Karma wait for a message from a browser before disconnecting from it, 10000 is default
    browserNoActivityTimeout: 10000,
    //timeout for capturing a browser, 60000 is default
    captureTimeout: 60000,

    client: {
      //capture all console output and pipe it to the terminal, true is default
      captureConsole: false,
      //if true, Karma clears the context window upon the completion of running the tests, true is default
      clearContext: false,
      //run the tests on the same window as the client, without using iframe or a new window, false is default
      runInParent: false,
      //true: runs the tests inside an iFrame; false: runs the tests in a new window, true is default
      useIframe: true,
      jasmine: {
        //tells jasmine to run specs in semi random order, false is default
        random: true
      }
    },

    /* karma-webpack config
       pass your webpack configuration for karma
       add `babel-loader` to the webpack configuration to make
       the ES6+ code in the tests files readable to the browser
       eg. import, export keywords */
    webpack: {
      // mode: webpackConfig.mode,
      // plugins: webpackConfig.plugins,
      // module: {
      //   rules: [
      //     // {
      //     //   test: /\.html$/,
      //     //   loader: 'html-loader',
      //     //   options: {
      //     //     esModule: false,
      //     //   },
      //     // },
      //     // {
      //     //   test: /\.js$/i,
      //     //   exclude: /(node_modules)/,
      //     //   loader: 'babel-loader',
      //     //   options: {
      //     //     presets: ['@babel/preset-env']
      //     //   }
      //     // },
      //     // {
      //     //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //     //   loader: 'file-loader',
      //     //   options: {
      //     //     name: '[name].[ext]',
      //     //     outputPath: './assets/img/',
      //     //   },
      //     // },
      //     ...webpackConfig.module.rules,
      //
      //   ]
      // },

      module: {
        rules: [
          {
            test: /\.js$/i,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            test: /\.(?:|png|jpg|svg|gif|ogg)$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: `./img/[name].[contenthash].[ext]`
              }
            }]
          },
          {
            test: /\.js/,
            include: /src/,
            exclude: /node_modules|\.spec\.js$/,
            use: "@jsdevtools/coverage-istanbul-loader"
          }
          // {
          //   test: /\.html$/,
          //   loader: 'html-loader',
          //   options: {
          //     esModule: false,
          //   },
          // },
        ]
      }


    //   entry: {
    //     homePage: path.resolve(__dirname,'./js/homePageScript.js'),
    //     carousel: path.resolve(__dirname,'./js/slidersInstances.js'),
    //     blogPage: path.resolve(__dirname,'./js/blogPageScript.js')
    //   },
    //   output: {
    //     path: path.resolve(__dirname, './dist'),
    //     filename: '[name].bundle.js',
    //   },
    },
    preprocessors: {
      //add webpack as preprocessor to support require() in tests-suits .js files
      './tests/*.js': ['webpack'],
      './src/js/*.js': ['coverage', 'webpack'],

    },
    webpackMiddleware: {
      //turn off webpack bash output when run the tests
      noInfo: true,
      stats: 'errors-only'
    },

    /*karma-mocha-reporter config*/
    mochaReporter: {
      output: 'noFailures'  //full, autowatch, minimal
    },
    // coverageReporter: {
    //   type : 'html',
    //   dir : 'coverage/',
    // },

    coverageIstanbulReporter: {
      dir: "coverage/%browser%",
      reports: ["text-summary", "lcovonly"]
    },

  })
}
