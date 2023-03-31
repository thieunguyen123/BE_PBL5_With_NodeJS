const { response } = require("express")
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { raw } from 'body-parser';
const salt = bcrypt.genSaltSync(10);
// const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email,password) => {
    return new Promise ( async(resolve,reject) => {
        try {
            let userData = {}

            let isExist = await checkUserEmail(email);
            if (isExist == true ) {


                let user = await db.Users.findOne({
                    where : {
                        email : email
                    },
                    attributes :  ['email','password','roleId'],
                    raw :true
                    
                })

                if (user ) {
                    let check  = await bcrypt.compareSync(password ,user.password);
                    if (check ) 
                    {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;
                        
                        userData.user = user;
                       
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password' ;

                    }
                }

                else {
                    userData.errCode = 2;
                    userData.errMessage = 'user is not found'
                }
                resolve(userData)
            }
            else{
                userData.errCode = 1;
                userData.errMessage = 'undone';
                resolve(userData); 
            }

        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) =>
 {
        return new Promise ( async (resolve,reject) => {
            try {
                let user = await db.Users.findOne({
                    where : {
                        email : userEmail
                    }
                })
                if (user) {
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            }  catch (error) {
                reject(error)
            }
        })

}

    let handleGetUsers = (userId) => {
        return new Promise (async (resolve,reject)=> {
            try {
                let users = '';
                if ( userId === 'ALL') {
                    users = await db.Users.findAll({
                        attributes: {
                            exclude : ['password']
                        }
                    })
                }
                if (userId && userId !== 'ALL') {
                    users = await db.Users.findOne({
                        where : {
                            id : userId
                        },
                        attributes: {
                            exclude : ['password']
                        }
                    })
                }
                resolve(users)


            } catch (error) {
                reject(error)
            }
        })
    }
    let hashUserPassword = (password) => 
 {
    return   new Promise( async (resolve, reject) => {

       
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve (hashPassword);
        } catch (error) {
            reject(error);
        }
    })
 }
let createUser = (user) => {
    return new Promise( async(resolve,reject)=> {
        try {
            let checked = await checkUserEmail(user.email);
            if (checked === true) {
                resolve({
                    errCode : 2,
                    message : 'email is already in used'
                })
            }
            else {
                let hashPasswordFromBCrypt = await hashUserPassword(user.password);
                await db.Users.create({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    address : user.address,
                    gender : user.gender === '1' ? true : false,
                    roleId: user.roleId,
                    password: hashPasswordFromBCrypt,
                  
                    phoneNumber: user.phoneNumber,
                
                })
    
                resolve({
                    errCode: 0,
                    message : 'create-done'
                });
            }
     

        } catch (error) {
            reject(error)
        }
    }

    )
}

let handleUpdateUser = (data)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let user  = await db.Users.findOne({
                where : {
                    id : data
                }
            })

            if (user) {

                    user.firstName = data.firstName;
                    user.lastName = data.lastName;
                    user.address = data.address;
                    user.email = data.email;
                    await user.save();
                   

                    resolve({
                        errCode : 0,
                        message : 'update done',
                        user
                    })
            }
            else{
                resolve({
                    errCode : 1,
                    message : 'không tồn tại id người dùng trên'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let handleDeleteUser = (data)=>{
    return  new Promise( async(resolve,reject)=>{
        try {
          let user =   await db.Users.findOne({
            where:{
                id : data
            }
               
            })
        if (user){
            await db.Users.destroy(
                {
                    where:{
                        id : data
                    }
                }
            );
            resolve({
                errCode : 0,
                message : 'delete done',
            })
        }
        else{
            resolve({
                errCode : 2,
                message : 'cant find user'
            })
        }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleUserLogin : handleUserLogin, 
    handleGetUsers : handleGetUsers,
    createUser : createUser,
    handleUpdateUser : handleUpdateUser,
    handleDeleteUser : handleDeleteUser,
}