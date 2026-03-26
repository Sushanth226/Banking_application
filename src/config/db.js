const mongoose=require('mongoose');

function connectDB(){
    mongoose.connect(process.env.mongo_url)
    .then(()=>{
        console.log("connected to database");
    })
    .catch((err)=>{
        console.log("error connecting to database",err);
    }
    )
}

module.exports=connectDB;