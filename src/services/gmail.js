const nodemailer=require("nodemailer");

const transportor=nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:"OAuth2",
        user:process.env.EMAIL_USER,
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken:process.env.REFRESH_TOKEN
    }
}
);

transportor.verify((error,success)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Email server Ready");
    }
})

const sendEmail=async (to,subject,text,html)=>{

   const info=await transportor.sendMail({
       from: `"Sushanth" <${process.env.EMAIL_USER}>`,
       to,
       subject,
       text,
       html
   });

};
module.exports={sendEmail};