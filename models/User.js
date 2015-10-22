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
  })
}