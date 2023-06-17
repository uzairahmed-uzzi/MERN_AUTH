const express=require('express');
const { errorHandler } = require('./middlewares/errorHandler');
const { connectDB } = require('./config/db');
require('dotenv').config();
const port=process.env.PORT||3000;
const app=express();
connectDB();
app.use(express.json());

app.use('/user',require('./routes/routes'));

app.use(errorHandler);
app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})