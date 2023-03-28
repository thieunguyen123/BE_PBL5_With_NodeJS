'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // firstName: DataTypes.STRING,
  // lastName: DataTypes.STRING,
  // email: DataTypes.STRING,
  // address : DataTypes.STRING,
  // gender : DataTypes.BOOLEAN,
  // roleId : DataTypes.STRING,
  // password: DataTypes.STRING,
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: "123456",
      firstName: 'Nguyen',
      lastName: 'Thieu',
      address: 'thon1',
      gender: 1,
      roleId: 'Admin',
      positionId: 'Master',
      phoneNumber: '045935354043',
      image: 'sd',    
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
  
};
