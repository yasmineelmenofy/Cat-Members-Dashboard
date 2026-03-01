"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMembersDashboard = getMembersDashboard;
exports.addMemberDashboard = addMemberDashboard;
exports.deleteMemberDashboard = deleteMemberDashboard;
exports.updateMemberDashboard = updateMemberDashboard;
const memberModel_1 = require("../models/memberModel");
async function getMembersDashboard(req, res) {
    try {
        const filter = {};
        const { name, subcircle, level } = req.query;
        if (name)
            filter.name = { $regex: name, $options: "i" };
        if (subcircle)
            filter.subcircle = subcircle;
        if (level)
            filter.level = level;
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
        const members = await memberModel_1.memberModel.find(filter).sort({ createdAt: -1 });
        res.render("members/list", { members });
    }
    catch (error) {
        res.status(500).send("Failed to get members");
    }
}
async function addMemberDashboard(req, res) {
    try {
        const newMember = new memberModel_1.memberModel(req.body);
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
    }
    catch (error) {
        res.status(500).send("Failed to create member");
    }
}
async function deleteMemberDashboard(req, res) {
    try {
        const { id } = req.params;
        const deletedMember = await memberModel_1.memberModel.findByIdAndDelete(id);
        if (!deletedMember) {
            res.status(404).send("Member not found");
            return;
        }
        res.redirect("/");
    }
    catch (error) {
        res.status(400).send("Invalid ID format");
    }
}
async function updateMemberDashboard(req, res) {
    try {
        const { id } = req.params;
        const updatedMember = await memberModel_1.memberModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedMember) {
            res.status(404).send("Member not found");
            return;
        }
        res.redirect("/");
    }
    catch (error) {
        res.status(400).send("Invalid ID format");
    }
}
//# sourceMappingURL=dashboard.js.map