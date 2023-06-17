const mongoose=require('mongoose');

require('dotenv').config();

exports.connectDB=async()=>{
    try{
        const con=await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true});
        console.log("CONNECTION IS ESTABLISHED ");
        
    }catch(e){
        console.log("DB IS NOT CONNECTED");
    }
};