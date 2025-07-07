import { Request,Response } from "express";
const createInvoice=async(req:Request,res:Response):Promise<void>=>{
    try{
        res.status(200).json({message:`create invoice`})
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
const getInvoice=async(req:Request,res:Response):Promise<void>=>{
    try{
        res.status(200).json({message:`get `})
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
const updateInvoice=async(req:Request,res:Response):Promise<void>=>{
    try{
        res.status(200).json({message:`update`})
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
const deleteInvoice=async(req:Request,res:Response):Promise<void>=>{
    try{
        res.status(200).json({message:`delete`});
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
export default {createInvoice,getInvoice,updateInvoice,deleteInvoice};