"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberControllers_1 = require("../controllers/memberControllers");
const router = (0, express_1.Router)();
router.get("/", memberControllers_1.getMembers);
router.post("/", memberControllers_1.addMember);
router.put("/:id", memberControllers_1.updateMember);
router.delete("/:id", memberControllers_1.deleteMember);
exports.default = router;
//# sourceMappingURL=members.js.map