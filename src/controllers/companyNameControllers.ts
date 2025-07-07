import { Request, Response } from "express";
import { AppDataSource } from '../lib/postgres';
import { CompanyName } from "../entities/companyName";
import { User } from '../entities/userModel';
type companyName = {
    name: string,
    id: number
    userId: number
}
const createCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, userId } = req.body as companyName;
        if(!name || !userId) res.status(400).json({message:`invalid keys`})
        const companyRepo = AppDataSource.getRepository(CompanyName);
        const userRepo = AppDataSource.getRepository(User);
        const createName = companyRepo.create({
            name: name,
            userId: userRepo.create({ id: userId }),
        });
        await companyRepo.save(createName);
        res.status(200).json({ data: createName })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
const getCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        const companyRepo = AppDataSource.getRepository(CompanyName);
        const Name= await companyRepo.find();
        res.status(200).json({message:`success`,data:Name})
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
const updateCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        const companyRepo = AppDataSource.getRepository(CompanyName);
        const { id, name } = req.body as companyName;
        if(!id || !name) res.status(400).json({message:`invalid keys`})
        const findCompany=await companyRepo.findOneBy({id})
        if(!findCompany) {
            res.status(404).json({message:`Not Found`})
         return;
        }
        findCompany.name=name;
        await companyRepo.save(findCompany);
        res.status(200).json({message:`Update Success`,data:findCompany});
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
const deleteCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body as companyName;
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
export default { createCompany, getCompany, updateCompany, deleteCompany };