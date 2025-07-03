import { Router } from "express";
import { verifyAccessToken } from '../middleware/verify'; // المسار حسب مشروعك
import accountTreeControllers from '../controllers/accountTreeControllers';
const router=Router();
router.get('/accountTree', accountTreeControllers.getAccountTree);
router.get('/finalAccount',accountTreeControllers.getFinalAccount);
router.get('/parentAccount',accountTreeControllers.getParentAccount);
router.post('/add',accountTreeControllers.createAccount);
router.put('/edit',accountTreeControllers.editAccountTree);
router.delete('/delete',accountTreeControllers.deleteAccount);
export default router;