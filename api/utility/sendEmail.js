import nodemailer from 'nodemailer';

//? Create email
export const sendEmail = async (to, subject, text) =>{
     try {

        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: "rakibadnan059@gmail.com",
              pass: "qwxzwozqflgmegds"
            }
          });
          await transport.sendMail({
            from : "rakibadnan060@gmail.com",
            to : to,
            subject : subject,
            text : text
          })

        
     } catch (error) {
        
     }
}