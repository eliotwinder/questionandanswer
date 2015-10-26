var Promise = require('bluebird');

module.exports = function(sequelize, dataTypes) {
  return sequelize.define('Question', {
      text: {
      type: dataTypes.STRING,
        allowNull: false
      }
    },{
      instanceMethods: {
        getCount: function(){
          var count = 0;
          for (var i = 0; i < this.Answers.length; i++) {
            count += this.Answers[i].Users.length;
          }

          return count;
        }
      }
    });
};