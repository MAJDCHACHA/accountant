import { Router } from "express";
import InvoiceControllers from "../controllers/InvoiceControllers";
const router=Router();
router.get("/get",InvoiceControllers.getInvoice);
router.post("/create",InvoiceControllers.createInvoice);
router.put('/edit',InvoiceControllers.updateInvoice);
router.delete('/delete',InvoiceControllers.deleteInvoice);
export default router;