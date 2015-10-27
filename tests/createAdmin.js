var url = 'http://localhost:' + require('../config').port;
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

module.exports = function(passport){
    request.postAsync({
      url: url + '/api/signup',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        username: 'admin',
        password: 'admin',
        isAdmin: 1
      }),
    });
}; 