const { response } = require("express")
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { promiseImpl } from 'ejs';
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => 
{   
    return new Promise( async(resolve ,reject ) => 
    {
        try {
                let hashPasswordFromBCrypt = await hashUserPassword(data.password);
                await db.Users.create({
                    firstName: data.FirstName,
                    lastName: data.LastName,
                    email: data.email,
                    address : data.Address,
                    gender : data.Gender === '1' ? true : false,
                    roleId: data.roleId,
                    password: hashPasswordFromBCrypt,
                    phoneNumber: data.PhoneNumber,
                
                })
                resolve('oke create')
                
        } catch (error) {
                reject(error);
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

 let getAllUser = () => 
 {
    return new Promise ( async (resolve , reject) => 
    {
        try {
            let users = db.Users.findAll();
            resolve(users);

        } catch (error) {
            reject(error);
        }
    } )
 }

 let getUserInfoById  = (userId) => {
        return new Promise(async (resolve,reject)=>{
            
          

        try {
            let user = await db.Users.findOne({
                where: {
                     id: userId
                    
                },
                raw: true,
            })
            if (user) {
                resolve(user)
            }
            else{
                resolve({})
            }
        } catch (error) 
        {
            reject(error)
        }

        })
 }


 let updateUser = (data) => {
            return new Promise ( async(resolve,reject)=>{
            try {
                
                let user = await db.Users.findOne({
                    where : {
                        id : data.id
                    }
                })
                if (user) {
                    user.firstName = data.firstName;
                    user.lastName = data.lastName;
                    user.address = data.address;
                    user.phoneNumber = data.phoneNumber;
                    await user.save();
                    let allUsers = await db.Users.findAll();
                    resolve(allUsers);
                }
                else{
                    resolve()
                }
            } catch (error) {
                reject(error)
            }
            })
 }  
let deleteUser = (data)=> {
    return new Promise (async(resolve, reject)=>{
        try {

            let user =await db.Users.findOne({
                where : {
                    id : data
                }
             
            })
            if (user) {
                await user.destroy();
                let Users = await db.Users.findAll();
                resolve(Users);
            }
            else{
                resolve()
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewUser : createNewUser,
    getAllUser : getAllUser,
    getUserInfoById : getUserInfoById,
    updateUser : updateUser,
    deleteUser : deleteUser,
}