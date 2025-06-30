import { Request,Response } from "express";
import { AppDataSource } from '@/lib/postgres';
import { JournalEntry } from "@/entities/JournalEntry";
import { JournalDetails } from "@/entities/JournalDetails";
type Journal={
    date?:string;
    description?:string;
    type?:string;
    userId?:number;
    status?:string
    details?:Journal[]

}
const createJournal=async(req:Request,res:Response):Promise<void>=>{
    try{

    }
    catch(err){
        res.status(500).json(err)
    }
}
const getJournal=async(req:Request,res:Response):Promise<void>=>{
  try{

    }
    catch(err){
        res.status(500).json(err)
    }
}
const updateJournal=async(req:Request,res:Response):Promise<void>=>{
  try{

    }
    catch(err){
        res.status(500).json(err)
    }
}
const deleteJournal=async(req:Request,res:Response):Promise<void>=>{
  try{

    }
    catch(err){
        res.status(500).json(err)
    }
}
export default{createJournal,getJournal,updateJournal,deleteJournal}