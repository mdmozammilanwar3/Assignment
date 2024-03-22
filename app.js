const express=require("express");
const bodyParser = require('body-parser');
require('dotenv').config();
const Logger = require("./middleware/Logger");
const app=express();
app.use(bodyParser.json());
const userRouter=require("./routers/userRouter");
const productRouter=require("./routers/productRouter");
const morgan = require('morgan');

const cors = require('cors');
app.use(cors());
// apply middleware
app.use(morgan('tiny'));
app.use(Logger);
app.use("/user",userRouter);
app.use("/api",productRouter);

app.get("/welcome",(req,res)=>{
    res.json({message:"Welcome to the node-app"})
})
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running : ${PORT}`);
})