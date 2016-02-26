var SC = require('node-soundcloud');
var env = require('env2')('./config.env');

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      description: 'our prototype login page',
      handler: function(request, reply) {

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
