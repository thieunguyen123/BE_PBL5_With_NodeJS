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


let createUser = async (req, res) =>{
    let check = req.body
    if (Object.keys(check).length === 0 ) {
        // await userServices.createUser(check);
        // console.log(check);
        return res.status(200).json({
            errCode : 1,
            message : 'no req'
        })
        // console.log('ready');
        
    }
    else{


        // return res.status(200).json({
        //     errCode : 1,
        //     message : 'no req',
        
        // })
       let message = await userServices.createUser(check)
        
         
        return res.status(200).json(message)
    }
     


}

let updateUser =  async (req,res)=> {
    let check = req.body
    if (Object.keys(check).length === 0 ) {
        // await userServices.createUser(check);
        // console.log(check);
        return res.status(200).json({
            errCode : 1,
            message : 'no req'
        })
        // console.log('ready');
        
    }
    else{


        // return res.status(200).json({
        //     errCode : 1,
        //     message : 'no req',
        
        // })
       let message = await userServices.handleUpdateUser(check)
        
         
        return res.status(200).json(message)
    
}
}

let deleteUser = async (req,res) =>{
    let check = req.body.id;
    if (!check) {
        return res.status(200).json({
            errCode : 1,
            message : 'missed id',
          
        })
    }
   let message=  await userServices.handleDeleteUser(check)

    return res.status(200).json(message)
}


 let getAllCodes = async (req,res)=>{
    try {
        
            let gettype = req.query.type;
            let data = await userServices.getDataAllCodes(gettype);
            return res.status(200).json(data);
        
      
    } 
    catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode : -1,
            message : 'error connect to server'
        })
   
 }
}


module.exports = {
    handleLogin: handleLogin,
    handleGetUsers : handleGetUsers,
    createUser : createUser,
    updateUser : updateUser,
    deleteUser : deleteUser,
    getAllCodes: getAllCodes,
   
}