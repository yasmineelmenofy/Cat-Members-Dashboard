import { Document, Model } from "mongoose";
export interface IMember extends Document {
    name: string;
    subcircle: "nodejs" | "php" | "java" | "dotnet";
    level: "beginner" | "intermediate" | "advanced";
}
export declare const memberModel: Model<IMember>;
export declare function connectToDb(): Promise<void>;
//# sourceMappingURL=memberModel.d.ts.map