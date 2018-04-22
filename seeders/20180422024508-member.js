'use strict';

const date = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Members',[{
        mem_email: "jinseong@123.com",
        mem_pw: '1234',
        mem_name: 'jinseong',
        mem_nickname: 'jins',
        mem_picture: 'default',
        mem_from: 'korea',
        mem_major_lang: 'korean',
        mem_study_lang: 'english',
        mem_study_lang_sub: 'spanish',
        mem_message: 1,
        mem_mes_time1: date.getHours() + ":" + date.getMinutes(),
        mem_mes_time2: date.getHours() + ":" + date.getMinutes(),
        mem_datainsert_dt: date,
        mem_delete: 0,
        mem_hobby_1: 1,
        mem_hobby_2: 1,
        mem_major: 1,
        mem_level_id: 1,
        major_id: 1,
        hobby_id_1: 1,
        hobby_id_2: 1,
        createdAt: date,
        updatedAt: date
      }], {})

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
