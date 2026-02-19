import { membermodel } from "../models/memberModel.mjs";


export async function getmembersDashboard(req, res) {
    try {
        const filter = {};
        const { name, subcircle, level } = req.query;

        if (name) filter.name = { $regex: name, $options: "i" };
        if (subcircle) filter.subcircle = subcircle;
        if (level) filter.level = level;

        const subcircleOptions = ["nodejs", "php", "java", "dotnet"];
        const levelOptions = ["beginner", "intermediate", "advanced"];

        if (subcircle && !subcircleOptions.includes(subcircle)) {
            return res.status(400).send("Invalid subcircle");
        }
        if (level && !levelOptions.includes(level)) {
            return res.status(400).send("Invalid level");
        }

        const members = await membermodel.find(filter).sort({ createdAt: -1 });

        res.render("members/list", { members });
    } catch (error) {
        res.status(500).send("Failed to get members");
    }
}


export async function addmemberDashboard(req, res) {
    try {
        const newMember = new membermodel(req.body);

        const subcircleOptions = ["nodejs", "php", "java", "dotnet"];
        const levelOptions = ["beginner", "intermediate", "advanced"];

        if (!subcircleOptions.includes(newMember.subcircle)) {
            return res.status(400).send("Invalid subcircle");
        }
        if (!levelOptions.includes(newMember.level)) {
            return res.status(400).send("Invalid level");
        }

        await newMember.save();
        res.redirect("/"); 
    } catch (error) {
        res.status(500).send("Failed to create member");
    }
}


export async function deleteMemberDashboard(req, res) {
    try {
        const { id } = req.params;
        const deletedMember = await membermodel.findByIdAndDelete(id);

        if (!deletedMember) return res.status(404).send("Member not found");

        res.redirect("/"); 
    } catch (error) {
        res.status(400).send("Invalid ID format");
    }
}

export async function updateMemberDashboard(req, res) {
    try {
        const { id } = req.params;

        const updatedMember = await membermodel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedMember) return res.status(404).send("Member not found");

        res.redirect("/"); 
    } catch (error) {
        res.status(400).send("Invalid ID format");
    }
}
