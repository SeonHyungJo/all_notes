'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Login_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      llg_type: {
        type: Sequelize.INTEGER
      },
      llg_dt: {
        type: Sequelize.TIME
      },
      llg_success: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      member_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "Members",
            key: "id"
        },
        allowNull: false,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Login_logs');
  }
};