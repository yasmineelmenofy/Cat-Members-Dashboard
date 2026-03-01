import { Router, Request, Response } from "express";
import { memberModel, IMember } from "../models/memberModel";
import {
  getMembersDashboard,
  addMemberDashboard,
  updateMemberDashboard,
  deleteMemberDashboard,
} from "../controllers/dashboard";

const dashboardRouter: Router = Router();

dashboardRouter.get("/", getMembersDashboard);

dashboardRouter.get("/members/add", (req: Request, res: Response) => res.render("members/add"));

dashboardRouter.post("/members", addMemberDashboard);

dashboardRouter.get("/members/:id/edit", async (req: Request, res: Response) => {
  const member: IMember | null = await memberModel.findById(req.params.id);
  res.render("members/edit", { member });
});

dashboardRouter.put("/members/:id", updateMemberDashboard);
dashboardRouter.delete("/members/:id", deleteMemberDashboard);

export default dashboardRouter;