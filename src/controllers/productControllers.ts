import { Request,Response } from "express";
import { AppDataSource } from '../lib/postgres';
import { CompanyName } from "../entities/companyName";
import {User} from '../entities/userModel'
import {Product} from '../entities/product'
type ProductDetails={
    id:number;
    name:string;
    description:string;
    userId:number;
    companyId: number; // ID of existing company
}
const createProduct=async(req:Request,res:Response): Promise<void>=>{
    try{
        const {name,description,userId,companyId}=req.body as ProductDetails;
        const productRepo=AppDataSource.getRepository(Product);
        const userRepo=AppDataSource.getRepository(User);
        const companyRepo=AppDataSource.getRepository(CompanyName);
        const createProduct=productRepo.create({
            name:name,
            description:description,
            userId:userRepo.create({id:userId}),
            companyId:companyRepo.create({id:companyId})
        })
        if(!name || !description || !userId || !companyId ) {
            res.status(400).json({message:`invalid keys`})
        return;
        }
            await productRepo.save(createProduct);
        res.status(200).json({message:`create product`,data:createProduct});
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
const getProduct=async(req:Request,res:Response): Promise<void>=>{
    try{
        const productRepo=AppDataSource.getRepository(Product);
        const product=await productRepo.find();
        if(!product) {
            res.status(203).json({message:`no content`})
            return;
        }
        res.status(200).json({message:`get product`,data:product})
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
const editProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, name, description,companyId } = req.body as ProductDetails;
        const productRepo = AppDataSource.getRepository(Product);
        const companyRepo=AppDataSource.getRepository(CompanyName);
        if (!id || !name || !description ||!companyId) {
             res.status(400).json({ message: `invalid keys` });
             return
        }
        const findProduct = await productRepo.findOneBy({ id: id });
        if (!findProduct) {
             res.status(204).json({ message: `No Content` }); // 204 بدلاً من 203
             return
        }
        const findCompany=await companyRepo.findOneBy({id:companyId});
        if(!findCompany){
            res.status(204).json({message:`No Content`})
            return;
        }

        
        findProduct.name = name ?? findProduct.name;
        findProduct.description = description ?? findProduct.description;
        findProduct.companyId=findCompany
        await productRepo.save(findProduct);
         res.status(200).json({ message: `update product`, data: findProduct });
         return
    }
    catch (err) {
         res.status(500).json({ message: 'Unknown error' });
         return
    }
}
const deleteProduct=async(req:Request,res:Response): Promise<void>=>{
    try{
        res.status(200).json({message:`delete product`})
    }
    catch(err){
        res.status(500).json({message:err})
    }
}
export default {createProduct,getProduct,editProduct,deleteProduct};