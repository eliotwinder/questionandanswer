module.exports = function(sequelize, dataTypes) {
  return sequelize.define('Answer', {
    text: {
      type: dataTypes.STRING,
      allowNull: false
    }
  })
}