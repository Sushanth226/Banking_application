const nodemailer=require("nodemailer");

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD    
    }
}
);

transporter.verify((error,success)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Email server Ready");
    }
})

const sendEmail=async (to,subject,text,html)=>{

   const info=await transporter.sendMail({
       from: `"Sushanth" <${process.env.EMAIL_USER}>`,
       to,
       subject,
       text,
       html
   });

};
const sendTransactionSuccessEmail = async (
    userEmail,    name,    amount,    toaccount) => {

    const subject = "Transaction Successful";

    const html = `
    <div style="font-family: sans-serif; color: #333; line-height: 1.5;">
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your recent transaction was successful.</p>
        <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Amount:</strong> ₹${amount}</li>
            <li><strong>To Account:</strong> ${toaccount}</li>
            <li><strong>Status:</strong> <span style="color: green;">Completed</span></li>
        </ul>
        <p>Thank you for using our services.</p>
    </div>`;

    const text = `Hello ${name},\n\nYour transaction of ₹${amount} was successfully sent to ${toaccount}.`;

    await transporter.sendMail({
        from: `"Bank Support" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject,
        text,
        html
    });

};

const sendTransactionFailureEmail = async (
    userEmail,    name,    amount,    toaccount) => {

    const subject = "Transaction Failed";

    const html = `
    <div style="font-family: sans-serif; color: #333; line-height: 1.5;">
        <p>Hello <strong>${name}</strong>,</p>
        <p>We couldn't process your recent transaction.</p>
        <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Attempted Amount:</strong> ₹${amount}</li>
            <li><strong>To Account:</strong> ${toaccount}</li>
            <li><strong>Status:</strong> <span style="color: red;">Failed</span></li>
        </ul>
        <p>No funds were deducted from your account. Please try again later.</p>
        <p>Thank you for using our services.</p>
    </div>`;

    const text = `Hello ${name},\n\nYour transaction of ₹${amount} failed to reach ${toaccount}. No funds were deducted.`;

    await transporter.sendMail({
        from: `"Bank Support" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject,
        text,
        html
    });

};
module.exports={sendEmail, sendTransactionSuccessEmail, sendTransactionFailureEmail};