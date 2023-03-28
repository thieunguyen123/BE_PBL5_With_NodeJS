
import db from '../models/index';
import bcrypt from 'bcryptjs'
import { raw } from 'body-parser';

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
module.exports = {
    handleUserLogin : handleUserLogin,
}