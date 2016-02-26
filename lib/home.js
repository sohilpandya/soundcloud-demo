var SC = require('node-soundcloud');
var env = require('env2')('./config.env');

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      description: 'our prototype login page',
      handler: function(request, reply) {

        // var client_id = 'e3260c6ce4370597a3d9afbc06fd58ac';
        // var client_secret = '2b565adc47d4fd9cbfc83fc6b9701d13';
        // var callback_uri = 'http://localhost:8000/callback';

        // SC.init({
        //   id: client_id,
        //   secret: client_secret,
        //   uri: callback_uri
        // });
        SC.init({
          id: process.env.client_id,
          secret: process.env.client_secret,
          uri: process.env.callback_uri
        });

        var url = SC.getConnectUrl();
        reply.redirect(url);
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'Home'
};
