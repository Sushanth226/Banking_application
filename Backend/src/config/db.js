const mongoose=require('mongoose');

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("connected to database");
    })
    .catch((err)=>{
        console.log("error connecting to database",err);
        process.exit(1);
    }
    )
}

module.exports=connectDB;