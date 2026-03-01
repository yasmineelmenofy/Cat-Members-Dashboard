"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const method_override_1 = __importDefault(require("method-override"));
const path_1 = __importDefault(require("path"));
const memberModel_1 = require("./models/memberModel");
const members_1 = __importDefault(require("./routes/members"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, method_override_1.default)("_method"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use("/", dashboard_1.default);
app.use("/members", members_1.default);
const startServer = async () => {
    try {
        await (0, memberModel_1.connectToDb)();
        app.listen(3000, () => {
            console.log("I am listening on port 3000");
        });
    }
    catch (error) {
        console.error("Failed to connect to the server", error);
    }
};
startServer();
//# sourceMappingURL=app.js.map