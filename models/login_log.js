'use strict';
module.exports = (sequelize, DataTypes) => {
  var Login_log = sequelize.define('Login_log', {
    llg_type: {type: DataTypes.INTEGER},
    llg_dt: {type: DataTypes.TIME},
    llg_success: {type: DataTypes.INTEGER},
  }, {});
  Login_log.associate = function(models) {
    Login_log.belongsTo(models.Member, {
      onDelete: "SET NULL",
      onUpdate: 'CASCADE',
      foreignKey: 'member_id'
    })
  };
  return Login_log;
};