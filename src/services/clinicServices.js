import { reject } from "lodash";
import db from "../models/index.js";
require("dotenv").config();

let createClinic = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !input.name ||
        !input.address ||
        !input.descriptionHTML ||
        !input.descriptionMarkdown ||
        !input.image
      ) {
        resolve({
          Message: "missing param!",
          errCode: 1,
        });
      } else {
        await db.clinic.create({
          name: input.name,
          image: input.imageBase64,
          descriptionHTML: input.descriptionHTML,
          descriptionMarkdown: input.descriptionMarkdown,
          address: input.address,
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

let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = db.clinic.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        Message: "ok",
        errCode: 0,
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailClinicById = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!input) {
        resolve({
          Message: "missing required param!",
          errCode: 1,
        });
      } else {
        let data = await db.clinic.findAll({
          where: {
            id: input,
          },
          attributes: [
            "name",
            "address",
            "descriptionMarkdown",
            "descriptionHTML",
          ],
        });
        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.doctorInfor.findAll({
            where: {
              clinicId: input,
            },
            attributes: ["doctorId", "provinceId"],
          });
          data.doctorClinic = doctorClinic;
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
  createClinic,
  getAllClinic,
  getDetailClinicById,
};
