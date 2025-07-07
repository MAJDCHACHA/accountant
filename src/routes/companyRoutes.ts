import { Router } from "express";
import companyNameControllers from "../controllers/companyNameControllers";
const router=Router();
router.get('/get',companyNameControllers.getCompany);
router.post('/add',companyNameControllers.createCompany);
router.put('/edit',companyNameControllers.updateCompany);
router.delete('/delete',companyNameControllers.deleteCompany);
export default router;