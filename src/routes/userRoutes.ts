import { Router } from "express";
const router=Router();
import userControllers from "@/controllers/userControllers";
import {registerValidation } from '@/validations/userValidation'
import {handleValidationErrors } from '@/middleware/handleValidation'
import { verifyAccessToken } from '@/middleware/verify'; // المسار حسب مشروعك
// router.get("/get",(req,res)=>{
//      res.status(200).json({message:`hello`})
// })
router.get("/get",userControllers.getUser);
router.post(
  "/register",
  registerValidation,
  handleValidationErrors, // <--- هنا نتحقق من الأخطاء
  userControllers.register
);router.post("/login",userControllers.login);
router.post("/refresh",userControllers.refreshToken);
export default router;