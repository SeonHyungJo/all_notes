'use strict';

const models = require('./index')
module.exports = (sequelize, DataTypes) => {
  var Member = sequelize.define('Member', {
    mem_email: {type: DataTypes.STRING, allowNull: false},
    mem_pw: {type: DataTypes.STRING, allowNull: false},
    mem_name: {type: DataTypes.STRING, allowNull: false},
    mem_nickname: {type: DataTypes.STRING, allowNull: false},
    mem_picture: DataTypes.STRING,
    mem_from: DataTypes.STRING,
    mem_major_lang: DataTypes.STRING,
    mem_study_lang: DataTypes.STRING,
    mem_study_lang_sub: DataTypes.STRING,
    mem_message: DataTypes.SMALLINT,
    mem_mes_time1: DataTypes.TIME,
    mem_mes_time2: DataTypes.TIME,
    mem_datainsert_dt: DataTypes.DATE,
    mem_delete: DataTypes.SMALLINT,
    mem_hobby_1: DataTypes.STRING,
    mem_hobby_2: DataTypes.STRING,
    mem_major: DataTypes.STRING
  }, {
    
  });
  Member.associate = function(models) {
    Member.belongsTo(models.Member_level, {
      onDelete: "SET NULL",
      onUpdate: 'CASCADE',
      foreignKey: 'mem_level_id'
    });
    Member.belongsTo(models.Major, {
      onDelete: "SET NULL",
      onUpdate: 'CASCADE',
      foreignKey: 'major_id'
    });
    Member.belongsTo(models.Hobby, {
      onDelete: "SET NULL",
      onUpdate: 'CASCADE',
      foreignKey: 'hobby_id_1'
    });
    Member.belongsTo(models.Hobby, {
      onDelete: "SET NULL",
      onUpdate: 'CASCADE',
      foreignKey: 'hobby_id_2'
    });
    Member.hasMany(models.major);
  };

  //인스턴스 메서드
  Member.prototype.authenticate = function (value) {

    // 입력 pw값과 인스턴스가 가진 비밀번호(this.pw)와 비교한다.
    if(this.mem_pw === value) {
      return true;
    } else {
      return false;
    }
  }
  return Member;
};