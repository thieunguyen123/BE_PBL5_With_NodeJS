import specialtyServices from "../services/speicialtyServices";
let createNewSpecialty = async (req, res) => {
  try {
    let data = await specialtyServices.createNewSpecialty(req.body);
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
let getAllSpecialty = async (req, res) => {
  try {
    let data = await specialtyServices.getAllSpecialty();
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
let getDetailSpecialtyById = async (req, res) => {
  try {
    let data = await specialtyServices.getDetailSpecialtyById(
      req.query.id,
      req.query.location
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

export default {
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
};
