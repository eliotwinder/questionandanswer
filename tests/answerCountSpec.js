var test = require('tape');
var url = 'http://localhost:' + require('../config').port;
var request = require('request');


var fakeUser = {
  username: "ElCapitanTheGreat",
  password: "taco",
  isAdmin: 1
};

var fakeQuestion = {
  text: "What's going on in here?",
  answers: ["no, it's just fantasy", "Whaddya mean 'real'", "yes, in belief system, it is", "stupid question"]
};


// login to check auth
var j = request.jar();

test('signup Test', function(t){
  t.plan(1);
  
  request.post({
    url: url + '/api/signup',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(fakeUser),
    jar: j,
  }, function(error, response, body) {
    t.equal(error, null);
  });  
});

test('login user before testing questions end point', function(t){
  t.plan(0);
  
  request.post({
      url: url + '/api/login',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(fakeUser),
      jar: j,    
    }, function(error, response, body){
      
      if (error) {
        console.log(error);
      } else {
        t.end();
      }
  });
});


test('get questions', function(t){   
  t.plan(3);

  request.get({
    url: url + '/api/question',
    jar: j 
  }, function(error, response, body){
    var questions = JSON.parse(body);
    var answers = questions[0].answers;

    t.equal(!questions[0].text, false);
    t.equal(answers.length, 4);
  });

});