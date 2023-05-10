import db from "../models/index.js";
require("dotenv").config();

let createNewSpecialty = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !input.name ||
        !input.imageBase64 ||
        !input.descriptionHTML ||
        !input.descriptionMarkdown
      ) {
        resolve({
          Message: "missing param!",
          errCode: 1,
        });
      } else {
        await db.specialty.create({
          name: input.name,
          image: input.imageBase64,
          descriptionHTML: input.descriptionHTML,
          descriptionMarkdown: input.descriptionMarkdown,
        });
        resolve({
          Message: "oke",
          errCode: 0,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.specialty.findAll({});
      if (data && data.length > 0) {
        data.map((item, index) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
        resolve({
          Message: "oke",
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailSpecialtyById = (input, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!input || !location) {
        resolve({
          Message: "missing required param!",
          errCode: 1,
        });
      } else {
        let data = await db.specialty.findOne({
          where: {
            id: input,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });
        if (data) {
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.doctorInfor.findAll({
              where: {
                specialtyId: input,
              },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            doctorSpecialty = await db.doctorInfor.findAll({
              where: {
                specialtyId: input,
                provinceId: location,
              },
              attributes: ["doctorId", "provinceId"],
            });
          }
        } else {
          data = {};
        }

        resolve({
          Message: "oke",
          errCode: 0,
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
};
