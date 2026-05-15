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
const sendTransactionSuccessEmail = async (
    userEmail,    name,    amount,    toaccount) => {

    const subject = "Transaction successful";

    const text = `Hello ${name},

Your transaction of ${amount} is sent to ${toaccount}`;

    await transporter.sendMail({
        from: `"Sushanth" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject,
        text
    });

};

const sendTransactionFailureEmail = async (
    userEmail,    name,    amount,    toaccount) => {

    const subject = "Transaction Failed";

    const text = `Hello ${name},

Your transaction of ${amount} is failed to go ${toaccount}`;

    await transporter.sendMail({
        from: `"Sushanth" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject,
        text
    });

};
module.exports={sendEmail};