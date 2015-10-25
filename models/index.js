var config = require('../config.js');
var Sequelize = require('sequelize');

// create sequelize instance
var sequelize = new Sequelize(config.dbname, config.username, config.password, {
    // disable logging; default: console.log
    // logging: false
  });

// import sequelize models
var models = {
  'User': 'user.js',
  'Question': 'question.js',
  'Answer': 'answer.js'  
};

for (var k in models) {
  module.exports[k] = sequelize.import(__dirname + '/' + models[k]);
}

// create relationships between tables
(function(m) {
  
  // each question has one user that is a creator
  m.Question.belongsTo(m.User, {
    foreignKey: {
      allowNull: false
    },
    onDelete: 'cascade'
  });
  m.User.hasMany(m.Question);

  // each question has several answers
  m.Answer.belongsTo(m.Question, {
    foreignKey: {
      allowNull: false
    },
    onDelete: 'cascade'
  });
  m.Question.hasMany(m.Answer);

  // creates join table for user answers
  m.Answer.belongsToMany(m.User, {through: 'userAnswer'});
  m.User.belongsToMany(m.Answer, {through: 'userAnswer'});

})(module.exports);

// export sequelize instance
module.exports.sequelize = sequelize;
