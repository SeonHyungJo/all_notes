'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Member_levels', [{
      mem_level_name: 'normal',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    .then(() => {
      return queryInterface.bulkInsert('Hobbies',[{
        hobby_name: 'soccer',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})})
    .then(()=> {
      return queryInterface.bulkInsert('Majors',[{
        major_name: 'MIS',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})})
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
