var util=require('util'),
    soundcloud=require('./soundcloud'),
    express=require('express'),
    app=express.createServer();

soundcloud.saveOauthToken('90bfd2a3e6cf54515d6da428c1dd4d6a');

soundcloud.myPrivateStreamableTracks(function(data) {
  util.log(util.inspect(data));
});

soundcloud.myTracks(function(data) {
  util.log(util.inspect(data));
});

soundcloud.me(function(data) {
  util.log(util.inspect(data));
});

app.listen(process.env.C9_PORT);
util.log('started app');