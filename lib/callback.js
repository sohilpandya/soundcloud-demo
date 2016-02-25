var SC = require('node-soundcloud');
var querystring = require('querystring');
exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/callback',
    config: {
      description: 'our prototype login page',
      handler: function(request, reply) {
        var code = request.url.query.code
        SC.authorize(code, function (err, accessToken) {
          if (err) {
            throw err;
          } else {
            reply.redirect('/authorized')
          }
        })
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'Callback'
};
