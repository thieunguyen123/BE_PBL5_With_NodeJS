require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Thiệu đẹp trai 👻 " <vanthieu13022002@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line

    html: `
           
            <h3> Xin chào ${dataSend.patientName} </h3>
          
            <p> Cảm ơn bạn. Bạn nhận được email này vì đã đặt lịch khám bệnh ở TN hospital </p>
            <p> 
            Thông tin đặt lịch khám bệnh:
            </p>
            <div><b>
                Thời gian : ${dataSend.time}
            </b></div>
            <div><b>
                Bác Sỹ : ${dataSend.doctorName}
            </b></div>
            <p> Nếu các thông tin trên là đúng sự thật vui lòng nhấp vào đường link bên dưới để hoàn tất thủ tục </p>
            <div>
            <a href =${dataSend.redirectLink} target ="_blank" > Click here </a>
            </div>
            <div>Xin chân thành cảm ơn </div>
           
        `, // html body
  });
  // };
  // let sendAttachment = async (dataSend) => {
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.gmail.com",
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: process.env.EMAIL_APP, // generated ethereal user
  //       pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
  //     },
  //   });

  //   // send mail with defined transport object
  //   let info = await transporter.sendMail({
  //     from: '"Thiệu đẹp trai 👻 " <vanthieu13022002@gmail.com>', // sender address
  //     to: dataSend.receiverEmail, // list of receivers
  //     subject: "Kết quả đặt lịch khám bệnh", // Subject line
  //     html: getBodyHtmlEmailRemedy(dataSend),
  //     attachments: attachments,
  // html: `

  //         <h3> Xin chào ${dataSend.patientName} </h3>
  //         <p> Cảm ơn bạn. Bạn nhận được email này vì đã đặt lịch khám bệnh ở TN hospital </p>
  //         <p>
  //         Thông tin đặt lịch khám bệnh:
  //         </p>
  //         <div><b>
  //             Thời gian : ${dataSend.time}
  //         </b></div>
  //         <div><b>
  //             Bác Sỹ : ${dataSend.doctorName}
  //         </b></div>
  //         <p> Nếu các thông tin trên là đúng sự thật vui lòng nhấp vào đường link bên dưới để hoàn tất thủ tục </p>
  //         <div>
  //         <a href =${dataSend.redirectLink} target ="_blank" > Click here </a>
  //         </div>
  //         <div>Xin chân thành cảm ơn </div>

  //     `, // html body
  //   });
  // };
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
