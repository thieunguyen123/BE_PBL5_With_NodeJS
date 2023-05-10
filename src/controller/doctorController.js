import doctorServices from "../services/doctorServices";

let getTopDoctor = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  let data = await doctorServices.getTopDoctor(+limit);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(200).json({
      errCode: 1,
      Message: "error connect server",
    });
  }
};

let getAllDoctors = async (req, res) => {
  let data = await doctorServices.getAllDoctors();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(200).json({
      Message: "error connect to server",
      errCode: 1,
    });
  }
};

let saveInforDoctor = async (req, res) => {
  let resolve = await doctorServices.saveInforDoctor(req.body);
  if (resolve) {
    return res.status(200).json(resolve);
  } else {
    return res.status(200).json({
      Message: "error connect to server",
      errCode: 1,
    });
  }
};

let getDoctorDetail = async (req, res) => {
  let inputId = req.query.id;
  let data = await doctorServices.getDoctorDetail(inputId);
  if (!data) {
    return res.status(200).json({
      Message: "error connect to server",
      errCode: 1,
    });
  } else {
    return res.status(200).json(data);
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await doctorServices.bulkCreateSchedule(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      Message: "Error from the server",
    });
  }
};

let getScheduleByDate = async (req, res) => {
  try {
    let data = await doctorServices.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    );

    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      Message: "Error from the server",
    });
  }
};

let getExtraInforDoctorById = async (req, res) => {
  try {
    let data = await doctorServices.getExtraInforDoctorById(req.query.doctorId);
    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      Message: "error from the server",
      errCode: -1,
    });
  }
};
let getProfileDoctorById = async (req, res) => {
  try {
    let data = await doctorServices.getProfileDoctorById(req.query.doctorId);
    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      Message: "error from the server",
      errCode: -1,
    });
  }
};
let getListPatientForDoctor = async (req, res) => {
  try {
    let data = await doctorServices.getListPatientForDoctor(
      req.query.doctorId,
      req.query.date
    );
    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      Message: "error from the server",
      errCode: -1,
    });
  }
};
let sendRemedy = async (req, res) => {
  try {
    let data = await doctorServices.sendRemedy(req.body);
    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      Message: "error from the server",
      errCode: -1,
    });
  }
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
  sendRemedy : sendRemedy,
};
