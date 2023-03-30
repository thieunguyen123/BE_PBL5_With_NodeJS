import userServices from '../services/userServices';
import db from '../models/index'

let handleLogin= async (req,res)=> {

    let email = req.body.email;
   
    let password = req.body.password;
  
     if (!email || ! password) {
        return res.status(500).json({
            errCode: 1,
            message : 'error'
        })
     }

     let userData = await userServices.handleUserLogin(email,password);
   
     return res.status(200).json(
        {
          errCode : userData.errCode,
          message : userData.message,
          user: userData.user ? userData.user : {}
        }
    )
}



let handleGetUsers = async (req,res)=> {

    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode : 1,
            message : 'missed id',
            users
        })
    }
    let users = await userServices.handleGetUsers(id)

    return res.status(200).json({
        errCode : 0,
        message : 'oke',
        users
    })

}


module.exports = {
    handleLogin: handleLogin,
    handleGetUsers : handleGetUsers,
}