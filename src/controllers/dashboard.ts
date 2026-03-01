import { Request, Response } from "express";
import { memberModel, IMember } from "../models/memberModel";

export async function getMembersDashboard(req: Request, res: Response): Promise<void> {
  try {
    const filter: any = {};
    const { name, subcircle, level } = req.query as { [key: string]: string | undefined };

    if (name) filter.name = { $regex: name, $options: "i" };
    if (subcircle) filter.subcircle = subcircle;
    if (level) filter.level = level;

    const subcircleOptions = ["nodejs", "php", "java", "dotnet"];
    const levelOptions = ["beginner", "intermediate", "advanced"];

    if (subcircle && !subcircleOptions.includes(subcircle)) {
      res.status(400).send("Invalid subcircle");
      return;
    }
    if (level && !levelOptions.includes(level)) {
      res.status(400).send("Invalid level");
      return;
    }

    const members: IMember[] = await memberModel.find(filter).sort({ createdAt: -1 });
    res.render("members/list", { members });
  } catch (error) {
    res.status(500).send("Failed to get members");
  }
}

export async function addMemberDashboard(req: Request, res: Response): Promise<void> {
  try {
    const newMember = new memberModel(req.body);
    const subcircleOptions = ["nodejs", "php", "java", "dotnet"];
    const levelOptions = ["beginner", "intermediate", "advanced"];

    if (!subcircleOptions.includes(newMember.subcircle)) {
      res.status(400).send("Invalid subcircle");
      return;
    }
    if (!levelOptions.includes(newMember.level)) {
      res.status(400).send("Invalid level");
      return;
    }

    await newMember.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Failed to create member");
  }
}

export async function deleteMemberDashboard(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const deletedMember = await memberModel.findByIdAndDelete(id);

    if (!deletedMember) {
      res.status(404).send("Member not found");
      return;
    }

    res.redirect("/");
  } catch (error) {
    res.status(400).send("Invalid ID format");
  }
}

export async function updateMemberDashboard(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const updatedMember = await memberModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMember) {
      res.status(404).send("Member not found");
      return;
    }

    res.redirect("/");
  } catch (error) {
    res.status(400).send("Invalid ID format");
  }
}