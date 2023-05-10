"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bookings.belongsTo(models.Users, {
        foreignKey: "patientId",
        targetKey: "id",
      });
      bookings.belongsTo(models.Allcode, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeTypePatientData",
      });
    }
  }
  bookings.init(
    {
      statusId: DataTypes.STRING,
      patientId: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "bookings",
    }
  );
  return bookings;
};
