import db from "../models/index";
require("dotenv").config();
import emailServices from "../services/emailServices";
import { v4 as uuidv4 } from "uuid";
let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};
let patientBookAppointment = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !input.email ||
        !input.doctorId ||
        !input.timeType ||
        !input.date ||
        !input.fullName ||
        !input.time ||
        !input.doctorName ||
        !input.address ||
        !input.selectedGender
      ) {
        resolve({
          message: "missing required!",
          errCode: 1,
        });
      } else {
        let token = uuidv4();

        await emailServices.sendSimpleEmail({
          receiverEmail: input.email,
          patientName: input.fullName,
          time: input.time,
          doctorName: input.doctorName,
          redirectLink: buildUrlEmail(input.doctorId, token),
        });
        //upsert
        let data = await db.Users.findOrCreate({
          where: {
            email: input.email,
          },
          defaults: {
            email: input.email,
            roleId: "R3",
            gender: input.selectedGender,
            address: input.address,
            firstName: input.fullName,
          },
        });
        //create a booking record
        if (data && data[0]) {
          await db.bookings.findOrCreate({
            where: {
              patientId: data[0].id,
            },
            defaults: {
              statusId: "S1",
              doctorId: input.doctorId,
              patientId: data[0].id,
              date: input.date,
              timeType: input.timeType,
              token: token,
            },
          });
        }

        resolve({
          errCode: 0,
          message: "save infor patient succeed!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let verifyBookAppointment = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!input.doctorId || !input.token) {
        resolve({
          errCode: 1,
          message: "missing required param!",
        });
      } else {
        let data = await db.bookings.findOne({
          where: {
            doctorId: input.doctorId,
            token: input.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (data) {
          data.statusId = "S2";
          await data.save();
          resolve({
            message: "oke",
            errCode: 0,
          });
        } else {
          resolve({
            message: "appointment has been activated or does not exist",
            errCode: 2,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  patientBookAppointment,
  verifyBookAppointment,
};
