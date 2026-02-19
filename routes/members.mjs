import express from "express";
import { getmembers
    ,updateMember
    ,deleteMember
    ,addmember } from "../controllers/memberControllers.mjs";

const router=express.Router();

router.get('/',getmembers);
router.post('/',addmember);
router.put('/:id',updateMember);
router.delete('/:id',deleteMember);

export default router;