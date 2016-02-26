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
        console.log(userID);
        SC.get('/resolve.json?url=http://soundcloud.com/' + userID, function(err, object) {
          if (err) {
            return err;
          } else {
            console.log(object.location.split('/')[4].split('.')[0], '-----');
            var userID = object.location.split('/')[4].split('.')[0]
            SC.get('/users/' + userID + '/followers', {
              limit: 200
            }, function(err, followers) {
              if (err) {
                return err;
              } else {
                return reply(followers);

              }
            });

          }
        })


      }
    }
  }]);
  return next();
};

exports.register.attributes = {
  name: 'Authorized'
};
