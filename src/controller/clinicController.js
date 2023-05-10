import clinicServices from "../services/clinicServices";

let createClinic = async (req, res) => {
  try {
    let data = await clinicServices.createClinic(req.body);
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
let getAllClinic = async(req,res)=>{
    try {
        let data = await clinicServices.getAllClinic();
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
}
let getDetailClinicById = async(req,res)=>{
    try {
        let data = await clinicServices.getDetailClinicById(req.query.id);
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
}

export default {
  createClinic,
  getAllClinic,
  getDetailClinicById,
};
