import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import v2 from "cloudinary";


dotenv.config({});

const app=express();
const PORT=process.env.PORT || 3000;

app.get("/", (_,res)=>{
    return res.status(200).json({
        message:"This is a message from backend",
        success:true
    })

})
//middlewares
app.use(express.json());
app.use(cookieParser()); //to store token in cookies when we request data from browser to db
app.use(urlencoded({extended:true}));
const corsOptions={
    origin: 'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

//api
app.use("/api/v1/user", userRoute);
//"http://localhost:8000/api/v1/user/register"


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);

});