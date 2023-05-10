"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class doctorInfor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here\
      doctorInfor.belongsTo(models.Markdown, { foreignKey: "doctorId" });
      doctorInfor.belongsTo(models.Allcode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceTypeData",
      });
      doctorInfor.belongsTo(models.Allcode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceTypeData",
      });
      doctorInfor.belongsTo(models.Allcode, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentTypeData",
      });
    }
  }
  doctorInfor.init(
    {
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "doctorInfor",
      freezeTableName: true,
    }
  );
  return doctorInfor;
};
