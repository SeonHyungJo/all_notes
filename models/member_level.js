'use strict';
module.exports = (sequelize, DataTypes) => {
  var Member_level = sequelize.define('Member_level', {
    mem_level_name: {type: DataTypes.STRING, allowNull: false}
  }, {});
  Member_level.associate = function(models) {
    // associations can be defined here
    Member_level.hasMany(models.member);
  };
  return Member_level;
};