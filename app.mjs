import { connectToDb } from "./models/memberModel.mjs";
import express from "express";
import router from "./routes/members.mjs";
import dotenv from "dotenv";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import dashboardrouter from "./routes/dashboard.mjs";

dotenv.config();
const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", dashboardrouter);
app.use("/members",router);
async function startserver() {
    try{
        await connectToDb();

       app.listen(3000,()=>{
    console.log("Iam listening in port 3000");
       })
    }catch(error){
        console.log(`Failed to connect to the server ${error}`);
    }
    
}

startserver();