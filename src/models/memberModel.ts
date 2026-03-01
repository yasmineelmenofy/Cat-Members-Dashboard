import mongoose, { Schema, Document, Model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL;
if (!url) {
    throw new Error("MONGO_URL is not defined")
};

export interface IMember extends Document {
  name: string;
  subcircle: "nodejs" | "php" | "java" | "dotnet";
  level: "beginner" | "intermediate" | "advanced";
}

const membersSchema: Schema<IMember> = new Schema({
    name: {
        type: String, required: true
    },
    subcircle: {
        type: String, required: true, enum: ["nodejs", "php", "java", "dotnet"]
    },
    level: {
        type: String, required: true, enum: ["beginner", "intermediate", "advanced"]
    }
});

export const memberModel: Model<IMember> = mongoose.model<IMember>("member", membersSchema);

export async function connectToDb(): Promise<void> {
  if (!url) {
    throw new Error("MONGO_URL is not defined in .env");
  }

  try {
    await mongoose.connect(url);
    console.log("connected to mongodb");
  } catch (error) {
    console.error("Error cannot connect to db:", error);
  }
}