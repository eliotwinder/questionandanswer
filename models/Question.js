module.exports = function(sequelize, dataTypes) {
  return sequelize.define('Question', {
    text: {
      type: dataTypes.STRING,
      allowNull: false
    }
  })
}