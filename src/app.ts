import express, { Application } from "express";
import dotenv from "dotenv";
import methodOverride from "method-override";
import path from "path";

import { connectToDb } from "./models/memberModel";
import memberRouter from "./routes/members";
import dashboardRouter from "./routes/dashboard";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", dashboardRouter);
app.use("/members", memberRouter);

const startServer = async (): Promise<void> => {
  try {
    await connectToDb();

    app.listen(3000, () => {
      console.log("I am listening on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to the server", error);
  }
};

startServer();