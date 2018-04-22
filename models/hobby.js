'use strict';
module.exports = (sequelize, DataTypes) => {
  var Hobby = sequelize.define('Hobby', {
    hobby_name: DataTypes.STRING
  }, {});
  Hobby.associate = function(models) {
    // associations can be defined here
    Hobby.hasMany(models.member);
    Hobby.hasMany(models.member);
  };
  return Hobby;
};