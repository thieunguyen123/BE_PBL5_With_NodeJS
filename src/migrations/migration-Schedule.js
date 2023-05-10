'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedule', {
      // User.init({
      //   id: DataTypes.STRING,
      //   firstName: DataTypes.STRING,
      //   lastName: DataTypes.STRING,
      //   email: DataTypes.STRING,
      //   address : DataTypes.STRING,
      //   gender : DataTypes.BOOLEAN,
      //   roleId : DataTypes.STRING,
      // },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currentNumber: {
        type: Sequelize.INTEGER
      },
      maxNumber: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      timeType: {
        type: Sequelize.STRING
      },
      doctorId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedule');
  }
};