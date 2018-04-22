'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    user_id: DataTypes.STRING,
    user_pw: DataTypes.STRING
  });

  user.associate = function(models) {
    // 클래스 메서드
  };

  // 인스턴스 메서드
  user.prototype.authenticate = function (value) {
    // console.log("hi")
    if(this.user_pw === value) {
      return true;
    } else {
      return false;
    }
  }
  return user;
};