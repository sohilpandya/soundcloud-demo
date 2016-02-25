var SC = require('node-soundcloud');
// var SCC = require('soundcloud');
var Promise = require('bluebird');

exports.register = function(server, options, next) {
  server.route([{
    method: 'GET',
    path: '/authorized',
    config: {
      description: 'our prototype login page',
      handler: function(request, reply) {

        reply.view('authorized');

      }
    }
  }, {
    method: 'GET',
    path: '/authorized/{userID}',
    config: {
      description: 'our prototype login page',
      handler: function(request, reply) {

        var userID = request.params.userID;
        SC.get('/users/'+userID+'/followers', {limit: 200},function(err, followers) {
          if (err) {
            return err;
          } else {
            return reply(followers);

          }

        });
      }
    }
  }]);
  return next();
};

exports.register.attributes = {
  name: 'Authorized'
};
