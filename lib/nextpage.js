var SC = require('node-soundcloud');
exports.register = function(server, options, next) {
  server.route({
    method: 'POST',
    path: '/nextpage',
    config: {
      description: 'our prototype login page',
      handler: function(request, reply) {
        var url = request.payload.data;
        SC.get('/users/'+url, {
          limit: 200
        }, function(err, followers) {
          if (err) {
            return err;
          } else {
            return reply(followers);

          }

        });

      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'Nextpage'
};
