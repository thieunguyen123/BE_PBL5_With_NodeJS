import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController";
import specialtyController from "../controller/specialtyController";
import clinicController from "../controller/clinicController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/thieunguyen", homeController.overView);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putEditCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
  router.post("/api/login", userController.handleLogin);
  router.get("/api/getAllUsers", userController.handleGetUsers);
  router.post("/api/create-user", userController.createUser);
  router.put("/api/update-user", userController.updateUser);
  router.delete("/api/delete-user", userController.deleteUser);
  router.get("/api/allcodes", userController.getAllCodes);
  router.get("/api/get-top-doctor", doctorController.getTopDoctor);
  router.get("/api/get-all-doctor", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctor", doctorController.saveInforDoctor);
  router.get("/api/get-doctor-detail", doctorController.getDoctorDetail); //xem thong tin 1 bac si
  router.post("api/bulk-create-schedule", doctorController.bulkCreateSchedule); //tao lich hen bac si
  router.get("/api/get-schedule-by-date", doctorController.getScheduleByDate); //xem lich theo ngay
  router.get(
    "/api/get-extra-infor-doctor-by-id",
    doctorController.getExtraInforDoctorById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );
  router.get("/api/send-remedy", doctorController.sendRemedy); //check trang thai lich kham cua benh nhan va gui email
  router.post(
    "/api/patient-book-appointment",
    patientController.patientBookAppointment
  ); //tao acc cho benh nhan
  router.post(
    "/api/verify-book-appointment",
    patientController.verifyBookAppointment
  );

  router.post(
    "/api/create-new-specialty",
    specialtyController.createNewSpecialty
  );
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  return app.use("/", router);
};
router.get(
  "/api/get-detail-specialty-by-id",
  specialtyController.getDetailSpecialtyById
);
router.post("/api/create-clinic", clinicController.createClinic);
router.get("/api/get-all-clinic", clinicController.getAllClinic);
router.get(
  "/api/get-detail-clinic-by-id",
  clinicController.getDetailClinicById
);

module.exports = initWebRoutes;
