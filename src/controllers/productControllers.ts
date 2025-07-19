import { Request, Response } from "express";
import { AppDataSource } from '../lib/postgres';
import { Product } from '../entities/product'
import { CompanyName } from "../entities/companyName";
type ProductDetails = {
    id: number;
    name: string;
    userId: number;
    companyId: number;
    branchId: number;
    description: string;
    amount:number;
    pricePurchases:number;
    priceSales:number;
    unit:string
}
const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productRepo = AppDataSource.getRepository(Product);
        const { name, userId, companyId, branchId, description,amount,pricePurchases,priceSales,unit } = req.body as ProductDetails;
        if (!name || !userId || !companyId || !branchId || !description ||!amount || !priceSales || !pricePurchases  || !unit) {
            res.status(400).json({ message: `invalid keys` })
            return;
        }
        const findProduct = await productRepo.find({where:{ name:name} })
        if (findProduct.length===0) {        
        const createProduct = productRepo.create({
            name: name,
            userId: userId,
            companyId: companyId,
            branchId: branchId,
            description: description,
            amount:amount,
            pricePurchases:pricePurchases,
            priceSales:priceSales,
            unit:unit
        })

        await productRepo.save(createProduct);
        res.status(201).json({ message: `create product`, data: createProduct });
        return
        }
        res.status(400).json({message:`already exist`,findProduct})
        return;
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {

        const { branchId } = req.params;
        const branchIdNum = branchId ? Number(branchId) : undefined;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 2;
        const skip = (page - 1) * limit;
        const whereClause = branchIdNum ? { branchId: branchIdNum } : {};
        if(!branchId){
            res.status(400).json({message:`invalid keys`})
            return;
        }
        const productRepo = AppDataSource.getRepository(Product);
        const product = await productRepo.find({
            where: whereClause,
            relations: ['company']
        });

        if (product.length===0) {
            res.status(203).json({ message: `no content` })
            return;
        }
        const result = product.map(p => ({
            id: p.id,
            name: p.name,
            companyName: p.company ? p.company.name : null,
            amount:p.amount,
            pricePurchases:p.pricePurchases,
            priceSales:p.priceSales
        }));
        res.status(200).json({ message: `get product`, data: result })
        return;
    }
    catch (err) {
        res.status(500).json({ message: err })
        return;
    }
};
const editProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, name, description,companyId,amount } = req.body as ProductDetails;
        const productRepo = AppDataSource.getRepository(Product);
        const companyRepo=AppDataSource.getRepository(CompanyName);
        if (!id || !name || !description ||!companyId ||!amount) {
             res.status(400).json({ message: `invalid keys` });
             return
        }
        const findProduct = await productRepo.findOneBy({ id: id });
        const findCompany=await companyRepo.findOneBy({id:companyId});
        if (!findProduct) {
             res.status(203).json({ message: `No Content product` }); // 204 بدلاً من 203
             return
        }
        if(!findCompany){
            res.status(203).json({message:`No Content company`})
            return;
        }
        findProduct.name = name ?? findProduct.name;
        findProduct.description = description ?? findProduct.description;
        findProduct.companyId=companyId;
        findProduct.amount=amount
        await productRepo.save(findProduct);
         res.status(200).json({ message: `update product`, data: findProduct });
         return
    }
    catch (err) {
         res.status(500).json({ message: 'Unknown error' });
         return
    }
};
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: `delete product` })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
};
export default { getProduct, createProduct,editProduct, deleteProduct };