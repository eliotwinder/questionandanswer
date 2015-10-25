var bcrypt = require('bcryptjs');

module.exports = function(sequelize, dataTypes) {
  return sequelize.define('User', {
    username: {
      type: dataTypes.STRING,
      allowNull: false
    },
    hashedPass: {
      type: dataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: dataTypes.BOOLEAN
    }
  },{
    classMethods: {
      generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null) 
      }
    }
  }, {
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.hashedPass);
      }
    }
  });
};