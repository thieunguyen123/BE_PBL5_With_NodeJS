"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("specialties", {
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
        type: Sequelize.INTEGER,
      },
      descriptionHTML: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      name: {
        type: Sequelize.STRING,
      },
      descriptionMarkdown: {
        type: Sequelize.TEXT,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("specialties");
  },
};
