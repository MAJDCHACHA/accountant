import { Router } from "express";
import { verifyAccessToken } from '../middleware/verify'; // المسار حسب مشروعك
import journalControllers from '../controllers/journalControllers'
const router=Router();
router.get("/getJournal/:branchId",journalControllers.getJournal);
router.get("/getById/:id",journalControllers.getJournal)
router.post("/add",journalControllers.createJournal);
router.put("/edit",journalControllers.updateJournal);
router.delete("/delete",journalControllers.deleteJournal);
export default router;