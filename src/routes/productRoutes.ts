import {Router} from 'express';
import productControllers from '../controllers/productControllers';
const router=Router();
router.get("/getProduct",productControllers.getProduct);
router.post("/createProduct",productControllers.createProduct);
router.put("/editProduct",productControllers.editProduct);
router.delete("/deleteProduct",productControllers.deleteProduct);
export default router;