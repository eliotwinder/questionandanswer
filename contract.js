// QUESTION ENDPOINT

// gets questions to answer
// currently returns 20 at a time 
// only returns questions that haven't been answered
GET '/api/question' => response body = {
  questions: [{
  text: "This is the actual question"
  totalAnswers: the number of people that have answered this question
  answers: [{
      text: "option 1"
      count: 43 // percentage of the vote this answer has recieved
    }, answer3, etc.]
  }, question2, etc.]
};

// returns all questions asked by an admin
POST '/api/answer' => response body = same as '/api/question'

// adds a question to db - currently accepts any # of answers
POST '/api/question' => request body = {
    question: {
      text: 'This is my new question'
      answers ['option 1', 'option 2', 'option 3', 'option 4', etc]
    }
  }
  response.body will be the same as request body

POST '/api/signup' =>
  request body = {
    username: 'username',
    password: 'password'
  };

  ok response redirects to '/questions'
  error response redirects to '/signup'

POST '/api/login' =>
  request body = {
    username: 'username',
    password: 'password'
  };

  response redirects to '/questions'