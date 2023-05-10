import db from "../models/index";
import _ from "lodash";
require("dotenv").config();
import emailServices from "../services/emailServices";

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getTopDoctor = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.Users.findAll({
        limit: limit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: doctor,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.Users.findAll({
        where: {
          roleId: "R2",
        },
        attributes: {
          exclude: ["password", "image"],
        },
      });

      if (doctors) {
        resolve({
          message: "done",
          errCode: 0,
          data: doctors,
        });
      } else {
        resolve({
          message: "can not find doctor",
          errCode: 2,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let checkArrRequired = (input) => {
  let arr = [
    "doctorId",
    "contentMarkdown",
    "contentHTML",
    "action",
    "selectedPrice",
    "selectedPayment",
    "selectProvince",
    "nameClinic",
    "addressClinic",
    "note",
    "specialtyId",
    "clinicId",
  ];
  let isvalid = true;
  let element = [];
  for (let i = 0; i < arr.length; i++) {
    if (!input.arr[i]) {
      isvalid = false;
      element = arr[i];
      break;
    }
  }
  return {
    isvalid: isvalid,
    element: element,
  };
};

let saveInforDoctor = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObj = checkArrRequired(input);
      if (checkObj === false) {
        resolve({
          message: `missing param ${checkObj.element}`,
          errCode: 2,
        });
      } else {
        //upsert to Markdown
        if (input.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: input.contentHTML,
            contentMarkdown: input.contentMarkdown,
            description: input.description,
            doctorId: input.doctorId,
          });
        } else if (input.action === "EDIT") {
          let doctorMarkdown = db.Markdown.findOne({
            where: { doctorId: input.doctorId },
            raw: false,
          });
          if (doctorMarkdown) {
            doctorMarkdown.contentHTML = input.contentHTML;
            doctorMarkdown.contentMarkdown = input.contentMarkdown;
            doctorMarkdown.description = input.description;
            doctorMarkdown.updateAt = new Date();
            await doctorMarkdown.save();
          }
        }

        let doctorInfor = await db.doctorInfor.findOne({
          where: {
            doctorId: input.doctorId,
            raw: false,
          },
        });

        if (doctorInfor) {
          //update
          doctorInfor.priceId = input.selectedPrice;
          doctorInfor.provinceId = input.selectProvince;
          doctorInfor.paymentId = input.selectedPayment;
          doctorInfor.nameClinic = input.nameClinic;
          doctorInfor.addressClinic = input.addressClinic;
          doctorInfor.note = input.note;
          doctorInfor.specialtyId = input.specialtyId;
          doctorInfor.clinicId = input.clinicId;
          await doctorInfor.save();
        } else {
          //create
          await db.doctorInfor.create({
            doctorId: input.doctorId,
            priceId: input.provinceId,
            provinceId: input.provinceId,
            paymentId: input.paymentId,
            nameClinic: input.nameClinic,
            addressClinic: input.addressClinic,
            note: input.note,
            specialtyId: specialtyId,
            clinicId: clinicId,
          });
        }

        resolve({
          errCode: 0,
          message: "save done",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getDoctorDetail = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          message: "missing required parameter",
          errCode: 2,
        });
      } else {
        let doctor = await db.Users.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },

            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.doctorInfor,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (doctor && doctor.image) {
          doctor.image = new Buffer(doctor.image, "base64").toString("binary");
        }
        if (!doctor) doctor = {};
        resolve({
          message: "detail done",
          errCode: 0,
          doctor,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
        resolve({
          message: "Missing required parameter !",
          errCode: 1,
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item, index) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }

        let existing = await db.Schedule.findAll({
          where: {
            doctorId: data.doctorId,
            date: data.formatedDate,
          },
          attributes: ["timeType", "doctorId", "date", "maxNumber"],
          raw: true,
        });

        //compare different
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });
        //create data
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          message: "ok",
          errCode: 0,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getScheduleByDate = (doctorId, date) => {
  return new Promise((resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          message: "missing required param!",
        });
      }
      let schedule = db.Schedule.findAll({
        where: {
          doctorId: doctorId,
          date: date,
        },
        includes: [
          {
            model: db.Allcode,
            as: "timeTypeData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Users,
            as: "doctorData",
            attributes: ["firstName", "lastName"],
          },
        ],
        raw: false,
        nest: true,
      });
      if (!schedule) schedule = [];
      resolve({
        errCode: 0,
        message: "ok",
        schedule,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getExtraInforDoctorById = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!input) {
        resolve({
          message: "missing required param!",
          errCode: -1,
        });
      } else {
        let data = await db.doctorInfor.findOne({
          where: {
            doctorId: input,
          },
          attributes: { exclude: ["id", "doctorId"] },

          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!data) {
          data = [];
        }

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getProfileDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        let data = await db.Users.findOne({
          where: { id: inputId },
          attributes: { exclude: ["password"] },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.doctorInfor,
              attributes: { exclude: ["id", "doctorId"] },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          message: "ok",
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getListPatientForDoctor = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          message: "missing param!",
          errCode: 1,
        });
      } else {
        let data = await db.bookings.findAll({
          where: {
            statusId: "S2",
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.Users,
              attributes: ["gender", "address", "firstName", "email"],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: Allcode,
              as: "timeTypePatientData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        resolve({
          message: "oke",
          errCode: 0,
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let sendRemedy = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !input.email ||
        !input.doctorId ||
        !input.patientId ||
        !input.timeType ||
        !input.imgBase64
      ) {
        resolve({
          message: "missing param!",
          errCode: 1,
        });
      } else {
        let patient = await db.bookings.findOne({
          where: {
            doctorId: input.doctorId,
            patientId: input.patient,
            statusId: "S2",
            timeType: input.timeType,
          },
          raw: false,
        });
        if (patient) {
          patient.statusId = "S3";
          await patient.save();
        }
        // await emailServices.sendAttachment(patient);
        resolve({
          message: "oke",
          errCode: 0,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTopDoctor: getTopDoctor,
  getAllDoctors: getAllDoctors,
  saveInforDoctor: saveInforDoctor,
  getDoctorDetail: getDoctorDetail,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctorById: getExtraInforDoctorById,
  getProfileDoctorById: getProfileDoctorById,
  getListPatientForDoctor: getListPatientForDoctor,
  sendRemedy: sendRemedy,
};
