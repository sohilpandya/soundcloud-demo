var SC = require('node-soundcloud');
exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/liketrack/{id}',
    config: {
      description: 'our prototype login page',
      handler: function(request, reply) {
        var id = request.params.id;
        console.log(request,'request from liketrack<<<<<<<<', id);
        var counter = 0;
        SC.get('/users/'+id+'/tracks', function(err, tracks){
          console.log(err,'<<<<<tracks');
          if(err){
            return err;
            console.log(err,'err from track');
          } else {
            var trackItems = [];
            trackItems.push(tracks[0].id);
            if(tracks.length>1){
              trackItems.push(tracks[2].id);
            }
            trackItems.forEach(function(elem,i,array){
              SC.put('/me/favorites/'+elem, function(err, response){
                console.log(err,'<<<<<response');
                if(err){
                  return err;
                  console.log(err,'err from response in track item');

                } else {
                  counter++;
                    if(array.length>1 && counter === 2){
                      return reply('done');
                    }
                    else if (array.length=== 1 && counter === 1){
                      return reply('done 2');
                    }
                }
              });
            });


          }
        })
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'Liketrack'
};
