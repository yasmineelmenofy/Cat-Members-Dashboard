"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberModel_1 = require("../models/memberModel");
const dashboard_1 = require("../controllers/dashboard");
const dashboardRouter = (0, express_1.Router)();
dashboardRouter.get("/", dashboard_1.getMembersDashboard);
dashboardRouter.get("/members/add", (req, res) => res.render("members/add"));
dashboardRouter.post("/members", dashboard_1.addMemberDashboard);
dashboardRouter.get("/members/:id/edit", async (req, res) => {
    const member = await memberModel_1.memberModel.findById(req.params.id);
    res.render("members/edit", { member });
});
dashboardRouter.put("/members/:id", dashboard_1.updateMemberDashboard);
dashboardRouter.delete("/members/:id", dashboard_1.deleteMemberDashboard);
exports.default = dashboardRouter;
//# sourceMappingURL=dashboard.js.map