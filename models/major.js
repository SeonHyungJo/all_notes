'use strict';
module.exports = (sequelize, DataTypes) => {
  var Major = sequelize.define('Major', {
    major_name: DataTypes.STRING
  }, {});
  Major.associate = function(models) {
    // associations can be defined here
  };
  return Major;
};