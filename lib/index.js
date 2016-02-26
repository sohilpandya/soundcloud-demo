var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var Handlebars = require('handlebars');
var env = require('env2');

var Home = require('./home.js');
var Callback = require('./callback.js');
var Authorized = require('./authorized.js');
var Liketrack = require('./liketrack.js');
var Nextpage = require('./nextpage.js');




exports.init = function(port, next) {

  var server = new Hapi.Server();

  var Plugins = [
    Inert,
    Vision,
    Home,
    Callback,
    Authorized,
    Liketrack,
    Nextpage
  ];

  server.connection({
    host: '0.0.0.0',
    port: port
  });

  server.register(Plugins, function(err) {
    if (err) {
      return next(err);
    }

    server.views({
      engines: {
        html: Handlebars
      },
      relativeTo: __dirname + '/../views',
      path: '.',
      layout: 'default',
      layoutPath: 'layout',
      helpersPath: 'helpers',
      partialsPath: 'partials'
    });

    server.start(function(err) {
      return next(err, server);
    });

  });
  module.exports = server;
};
