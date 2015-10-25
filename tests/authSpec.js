var test = require('tape');
var url = 'http://localhost:' + require('../config').port;
var request = require('request');


var fakeUser = {
  username: "ElCapitanTheGreat",
  password: "taco"
}


test('signup Test', function(t){
  t.plan(1);

  var j = request.jar();
  
  request.post({
    url: url + '/api/signup',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(fakeUser),
    jar: j,
  }, function(error, response, body) {
    t.equal(error, null);
  });  
});

test('good login test', function(t){
  t.plan(1);

  var j = request.jar()

  request.post({
    url: url + '/api/login',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(fakeUser),
    jar: j,    
  }, function(error, response, body){
    t.equal(body, 'Moved Temporarily. Redirecting to /questions');
  });
});

test('bad login test', function(t){
  t.plan(1);

  var j = request.jar()

  request.post({
    url: url + '/api/login',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      username: fakeUser.username,
      password: 'incorrect password'
    }),
    jar: j,    
  }, function(error, response, body){
    t.equal(body, 'Moved Temporarily. Redirecting to /login');
  });
});
