import { Router } from "express";
import { getMembers, updateMember, deleteMember, addMember } from "../controllers/memberControllers";

const router: Router = Router();

router.get("/", getMembers);
router.post("/", addMember);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

export default router;