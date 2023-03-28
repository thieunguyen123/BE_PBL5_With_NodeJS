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
          userData: userData
        }
    )
}



  
let check = (req, res) => {
    res.status(200).json('kashdjf')
}


module.exports = {
    handleLogin: handleLogin,
    check: check
}