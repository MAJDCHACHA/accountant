import { Router } from "express";
import branchControllers from "@/controllers/branchControllers";
const router=Router();
router.post("/add",branchControllers.createBranch);
router.get("/get",branchControllers.getBranch);
router.put("/edit",branchControllers.updateBranch);
export default router;