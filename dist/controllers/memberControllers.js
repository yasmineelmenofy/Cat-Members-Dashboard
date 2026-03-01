"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMembers = getMembers;
exports.addMember = addMember;
exports.deleteMember = deleteMember;
exports.updateMember = updateMember;
const memberModel_1 = require("../models/memberModel");
async function getMembers(req, res) {
    try {
        const filter = {};
        const name = req.query.name;
        const subcircle = req.query.subcircle;
        const level = req.query.level;
        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }
        if (subcircle) {
            filter.subcircle = subcircle;
        }
        if (level) {
            filter.level = level;
        }
        const subcircleOptions = ["nodejs", "php", "java", "dotnet"];
        const levelOptions = ["beginner", "intermediate", "advanced"];
        if (subcircle && !subcircleOptions.includes(subcircle)) {
            res.status(400).json({ message: "Invalid subcircle" });
            return;
        }
        if (level && !levelOptions.includes(level)) {
            res.status(400).json({ message: "Invalid level" });
            return;
        }
        const members = await memberModel_1.memberModel.find(filter).sort({ createdAt: -1 });
        res.json(members);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get members" });
    }
}
async function addMember(req, res) {
    try {
        const newMember = new memberModel_1.memberModel(req.body);
        const subcircleOptions = ["nodejs", "php", "java", "dotnet"];
        const levelOptions = ["beginner", "intermediate", "advanced"];
        if (!subcircleOptions.includes(newMember.subcircle)) {
            res.status(400).json({ error: "Invalid subcircle" });
            return;
        }
        if (!levelOptions.includes(newMember.level)) {
            res.status(400).json({ error: "Invalid level" });
            return;
        }
        await newMember.save();
        res.status(201).json({
            name: newMember.name,
            subcircle: newMember.subcircle,
            level: newMember.level,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create member" });
    }
}
async function deleteMember(req, res) {
    try {
        const { id } = req.params;
        const deletedMember = await memberModel_1.memberModel.findByIdAndDelete(id);
        if (!deletedMember) {
            res.status(404).json({ error: "Not found" });
            return;
        }
        res.status(200).json({
            message: "Member deleted successfully",
            id: deletedMember._id,
        });
    }
    catch (error) {
        res.status(400).json({ error: "invalid ID format" });
    }
}
async function updateMember(req, res) {
    try {
        const { id } = req.params;
        const updatedMember = await memberModel_1.memberModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedMember) {
            res.status(404).json({ error: "Member Not found" });
            return;
        }
        res.json(updatedMember);
    }
    catch (error) {
        res.status(400).json({ error: "invalid ID format" });
    }
}
//# sourceMappingURL=memberControllers.js.map