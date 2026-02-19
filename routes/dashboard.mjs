import express from "express";
import { membermodel } from "../models/memberModel.mjs";
import {
    getmembersDashboard,
    addmemberDashboard,
    updateMemberDashboard,
    deleteMemberDashboard,
} from "../controllers/dashboard.mjs";

const dashboardrouter = express.Router();

dashboardrouter.get("/", getmembersDashboard);
dashboardrouter.get("/members/add", (req, res) => res.render("members/add"));
dashboardrouter.post("/members", addmemberDashboard);
dashboardrouter.get("/members/:id/edit", async (req, res) => {
    const member = await membermodel.findById(req.params.id);
    res.render("members/edit", { member });
});
dashboardrouter.put("/members/:id", updateMemberDashboard);
dashboardrouter.delete("/members/:id", deleteMemberDashboard);

export default dashboardrouter;
