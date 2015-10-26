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

test('post question', function(t) {
  t.plan(2);
  request.post({
    url: url + '/api/question',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(fakeQuestion),
    jar: j 
  }, function(error, response, body){
    var parsedBody = JSON.parse(body);
    var answerLength = parsedBody.Answers.length;
    t.equal(parsedBody.text, fakeQuestion.text);
    t.equal(answerLength, 4);
  });
});

test('get questions, not checking if user has answered', function(t){   
  t.plan(2);

  request.get({
    url: url + '/api/question',
    jar: j 
  }, function(error, response, body){
    var parsedBody = JSON.parse(body);
    var answerLength = parsedBody[0].Answers.length;
    t.equal(parsedBody[0].text, fakeQuestion.text);
    t.equal(answerLength, 4);
  });

});