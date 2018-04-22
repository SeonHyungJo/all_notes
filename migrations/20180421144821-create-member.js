'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Members', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      mem_email: {type: Sequelize.STRING, allowNull: false},
      mem_pw: {type: Sequelize.STRING, allowNull: false},
      mem_name: {type: Sequelize.STRING, allowNull: false},
      mem_nickname: {type: Sequelize.STRING, allowNull: false},
      mem_picture: Sequelize.STRING,
      mem_from: Sequelize.STRING,
      mem_major_lang: Sequelize.STRING,
      mem_study_lang: Sequelize.STRING,
      mem_study_lang_sub: Sequelize.STRING,
      mem_message: Sequelize.SMALLINT,
      mem_mes_time1: Sequelize.TIME,
      mem_mes_time2: Sequelize.TIME,
      mem_datainsert_dt: Sequelize.DATE,
      mem_delete: Sequelize.SMALLINT,
      mem_hobby_1: Sequelize.STRING,
      mem_hobby_2: Sequelize.STRING,
      mem_major: Sequelize.STRING,
      createdAt: {allowNull: false,type: Sequelize.DATE},  
      updatedAt: {allowNull: false,type: Sequelize.DATE},
      
      mem_level_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "Member_levels",
            key: "id"
        },
        allowNull: false,
      },
      major_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "Majors",
            key: "id"
        },
        allowNull: false,
      },
      hobby_id_1: {
        type: Sequelize.INTEGER,
        references: {
          model: "Hobbies",
          key: "id"
        },
        allowNull: false,
      },
      hobby_id_2: {
        type: Sequelize.INTEGER,
        references: {
          model: "Hobbies",
          key: "id"
        },
        allowNull: false,
      }

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Members');
  }
};