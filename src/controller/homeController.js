
import db from '../models/index';
import CRUDServices from '../services/CRUD-services';

let getHomePage = async (req , res) =>
{
    try {
        let data= await db.Users.findAll();
      

        return res.render("homepage.ejs",{ data: JSON.stringify(data)});
       
    } 
    catch (error) {
        console.log(error)
    }
   

}
let getCRUD = (req,res) => 
{
    return res.render('crud.ejs');
}

let overView = (req,res) =>

{
    return res.render("viewover.ejs")
}


let postCRUD = async (req,res) =>

{
   let message =  await CRUDServices.createNewUser(req.body);
  console.log(message);
    return res.send('get crud');
}

let displayGetCRUD = async (req,res) => 
{
    let data =  await   CRUDServices.getAllUser();
   
    return res.render("showAllUsers.ejs",{
        dataTable : data
    });
}

let getEditCRUD = async (req,res) => 
{
    let userId =req.query.id;
    if(userId){  
        let userData = await  CRUDServices.getUserInfoById(userId);
       
        console.log(userData);
        res.render("editCRUD.ejs" , {
            users : userData
        });
        

    }
    else {
        res.send('khong ton tai');
    }}


let putEditCRUD = async (req,res)=> {
        let data =  req.body;
        let allUsers =   await CRUDServices.updateUser(data);
      res.render('showAllUsers.ejs',{
        dataTable : allUsers
      })
       
    // res.send('put edit thanh cong')
    }


let deleteCRUD = async   (req,res)=>{
        // let userId = req.query.id
        // await CRUDServices.deleteCRUD(userId);

        let id = req.query.id;

        if (id){
        let data=  await CRUDServices.deleteUser(id);
           
           return res.render("showAllUsers.ejs",{
            dataTable : data
           })
        }
        else{
            return res.send('cmm');
        }
  

        

    }
  

module.exports = {
    getHomePage: getHomePage,
    overView : overView,
    getCRUD : getCRUD,
    postCRUD : postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD : getEditCRUD,
    putEditCRUD : putEditCRUD,
    deleteCRUD : deleteCRUD
}