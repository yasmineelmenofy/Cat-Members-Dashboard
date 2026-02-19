import mongoose from "mongoose";
const { Schema } = mongoose;
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL;

const membersSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    subcircle:{
        type:String,
        required:true,
        enum:["nodejs", "php", "java", "dotnet"]
    },
    level:{
        type:String,
        required:true,
        enum:["beginner","intermediate","advanced"]
    }
})

export const membermodel=mongoose.model("member",membersSchema);

export async function connectToDb(){
    try{
        await mongoose.connect(url);
        console.log("connected to mongodb");
    }catch(error){
        console.log("Error can not connect to db");
    }
}