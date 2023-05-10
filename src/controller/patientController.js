import patientServices from "../services/patientServices";

let patientBookAppointment = async (req, res) => {
  try {
    let data = await patientServices.patientBookAppointment(req.body);
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
let verifyBookAppointment = async (req, res) => {
  try {
    let data = await patientServices.verifyBookAppointment(req.body);
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

export default {
  patientBookAppointment,
  verifyBookAppointment,
};
