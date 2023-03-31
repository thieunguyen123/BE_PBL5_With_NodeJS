import express from "express";
import homeController from "../controller/homeController";
import userController from '../controller/userController';

let router = express.Router();

let initWebRoutes = (app) =>
{   
    router.get('/',homeController.getHomePage);
    router.get('/thieunguyen',homeController.overView);
    router.get('/crud',homeController.getCRUD);
    router.post('/post-crud',homeController.postCRUD);
    router.get('/get-crud',homeController.displayGetCRUD);
    router.get('/edit-crud',homeController.getEditCRUD);
    router.post('/put-crud',homeController.putEditCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/api/login', userController.handleLogin);
    router.get ('/api/getAllUsers',userController.handleGetUsers);
    router.post('/api/create-user',userController.createUser);
    router.put('/api/update-user', userController.updateUser);
    router.delete('/api/delete-user',userController.deleteUser);

    return app.use("/" , router)

  
}
module.exports = initWebRoutes; 