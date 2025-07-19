import { Request, Response } from 'express';
import { Account } from "../entities/accountTree"
import { AccountRelation } from '../entities/accountDetails';
import { AppDataSource } from '../lib/postgres';
import { AccountFinalParent } from '../entities/accountFinalParent';
import { JournalEntryDetail } from '../entities/JournalDetails';
type AccountNode = {
  id: number;
  name: string;
  name_en?: string;
  accountType?: string;
  isConfig?: boolean;
  currency?:string;
  parentId?:number;
  final_account?: boolean;
  userId?:number;
  waring:number; 
  Ratio:number;
  children: AccountNode[];
};
type BranchAccount={
    branchId:number;
  parentFinalAccountId:number;

}


const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const AccountRepo = AppDataSource.getRepository(Account);
    const RelationRepo = AppDataSource.getRepository(AccountRelation);
    const FinalRepo = AppDataSource.getRepository(AccountFinalParent);

    const { name, name_en, currency, parentId, accountType, userId, waring, Ratio } = req.body as AccountNode;
    const {branchId,parentFinalAccountId}=req.body as BranchAccount;

    if (!name || !name_en || !currency || !parentId || !parentFinalAccountId || !accountType || !userId || waring === undefined || Ratio === undefined) {
      res.status(400).json({ message: `Invalid keys` });
      return;
    }

    const newAccount = AccountRepo.create({
      name,
      name_en,
      userId,
      branchId,
      currency,
      waring,
      Ratio,
      accountType,
    });

    const savedAccount = await AccountRepo.save(newAccount);

    const newRelation = RelationRepo.create({
      parentId: parentId,
      childId: savedAccount.id,
    });

    const newFinal = FinalRepo.create({
      finalId: parentFinalAccountId,
      childId: savedAccount.id,
    });

    await RelationRepo.save(newRelation);
    await FinalRepo.save(newFinal);

    res.status(201).json({ message: `Success`, data: savedAccount });
    return;

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
const getAccountTree = async (req: Request, res: Response): Promise<void> => {
  try {

    const branchId = Number(req.params.branchId);
    if (isNaN(branchId)) {
      res.status(400).json({ message: "Invalid branchId" });
      return;
    }
    const accountRepo = AppDataSource.getRepository(Account);
    const relationRepo = AppDataSource.getRepository(AccountRelation);

    const accounts = await accountRepo.find({where:{branchId:branchId}});
    const relations = await relationRepo.find({ relations: ["parent", "child"] });



    const nodeMap = new Map<number, AccountNode>();
    accounts.forEach(acc => {
      nodeMap.set(acc.id, {
        id: acc.id,
        name: acc.name,
        name_en: acc.name_en,
        accountType: acc.accountType,
        isConfig: acc.isConfig,
        waring:acc.waring,
        Ratio:acc.Ratio,
        children: [],
      });
    });

    relations.forEach(({ parent, child }) => {
      const parentNode = nodeMap.get(parent.id);
      const childNode = nodeMap.get(child.id);
      if (parentNode && childNode) {
        parentNode.children.push(childNode);
      }
    });

    const childIds = new Set(relations.map(r => r.child.id));
    const roots = accounts.filter(acc => !childIds.has(acc.id)).map(acc => nodeMap.get(acc.id)!);
    if(!roots || roots.length===0){
      res.status(203).json({message:`No Content`})
      return;
    }
    res.json({ tree: roots });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getFinalAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const branchId = Number(req.params.branchId);
    if (isNaN(branchId)) {
      res.status(400).json({ message: "Invalid branchId" });
      return;
    }
    const accountRepo = AppDataSource.getRepository(Account);
    const accounts = await accountRepo.find({
      where: { final_account: true ,branchId:branchId},
      select: ['id', 'name','accountType']
    })
    if(!accounts || accounts.length===0){
      res.status(203).json({message:`No Content`})
      return;
    }
    res.status(200).json(accounts);
    return;
  }
  catch (err) {
    res.status(500).json(err)
    return;
  }
};
const getParentAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const branchId = Number(req.params.branchId);
    if (isNaN(branchId)) {
      res.status(400).json({ message: "Invalid branchId" });
      return;
    }
    const accountRepo = AppDataSource.getRepository(Account);
    const accounts = await accountRepo.find({ where: { isParent: true ,branchId:branchId}, select: ['id', 'name','accountType'] });
    if(!accounts || accounts.length===0){
      res.status(203).json({message:`No Content`})
      return;
    }
    res.status(200).json(accounts);
    return;
  }
  catch (err) {
    res.status(500).json(err);
    return;
  }
}
const getChildAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const branchId = Number(req.params.branchId);
    if (isNaN(branchId)) {
      res.status(400).json({ message: "Invalid branchId" });
      return;
    }
    const accountRepo = AppDataSource.getRepository(Account);
    const accounts = await accountRepo.find({ where: { isParent: false ,branchId:branchId}, select: ['id', 'name','accountType'] });
    if(!accounts || accounts.length===0){
      res.status(203).json({message:`No Content`})
      return;
    }
    res.status(200).json(accounts);
    return;
  }
  catch (err) {
    res.status(500).json(err);
    return;
  }
}
const getAccountStatement = async (req: Request, res: Response): Promise<void> => {
  try {
    const accountIdRaw = req.params.accountId;

    if (typeof accountIdRaw !== "string") {
      res.status(400).json({ message: "accountId is required in params and must be a stringified number" });
      return;
    }

    const accountId = Number(accountIdRaw);

    if (isNaN(accountId)) {
      res.status(400).json({ message: "accountId must be a valid number" });
      return;
    }

    const accountRepo = AppDataSource.getRepository(Account);
    const journalDetailRepo = AppDataSource.getRepository(JournalEntryDetail
    );

    // 1. تحقق من وجود الحساب
    const account = await accountRepo.findOneBy({ id: accountId });
    if (!account) {
      res.status(203).json({ message: "Account not found" });
      return;
    }

    const details = await journalDetailRepo.find({
      where: { accountId: accountId },
      relations: [
        "journalEntry",
        "journalEntry.details",
        "journalEntry.details.account"  // تحميل بيانات الحساب المقابل
      ]
    });

    // 3. تكوين كشف الحساب
    const statement = details.map(detail => {
      // الحصول على الطرف المقابل
      const oppositeDetail = detail.journalEntry.details.find(d => d.accountId !== detail.accountId);
      const oppositeAccountName = oppositeDetail?.account?.name ?? "طرف مقابل غير معروف";

      return {
        journalEntryId: detail.journalEntry.id,
        date: detail.journalEntry.date,
        description: detail.journalEntry.description,
        debit: detail.debtor,
        credit: detail.creditor,
        oppositeAccount: oppositeAccountName
      };
    });
    if(statement.length===0){
      res.status(203).json({message:`الحساب متوازن`,account:account.name})
    }
    res.json({
      account: account.name,
      statement
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
};
const editAccount=async(req:Request,res:Response):Promise<void>=>{
  try{
    const AccountRepo = AppDataSource.getRepository(Account);
    const RelationRepo = AppDataSource.getRepository(AccountRelation);
    const FinalRepo = AppDataSource.getRepository(AccountFinalParent);
    const {id,name,name_en,accountType,Ratio,waring,parentId}=req.body as AccountNode;
    const {parentFinalAccountId}=req.body as BranchAccount;
    if(!id || !name || !name_en || !accountType || !Ratio || !waring || !parentId || !parentFinalAccountId){
      res.status(400).json({message:`Invalid keys`})
      return;
    }
    const findAccount=await AccountRepo.findOne({where:{id:id}});
    if(!findAccount){
      res.status(203).json({message:`No Content`})
      return;
    }
    findAccount.name=name;
    findAccount.name_en=name_en;
    findAccount.accountType=accountType;
    findAccount.Ratio=Ratio;
    findAccount.waring=waring;
    await AccountRepo.save(findAccount);
    const relation=await RelationRepo.findOne({where:{childId:id}})
    if(relation ){
      relation.parentId=parentId;
      await RelationRepo.save(relation);
    }
    const finalRelation = await FinalRepo.findOne({ where: { childId: id } });
    if(finalRelation){
      finalRelation.finalId=parentFinalAccountId
      await FinalRepo.save(finalRelation)
        }
    res.status(200).json({message:`Success`,data:findAccount})
    return;
  }
  catch(err){
    res.status(500).json({message:err})
    return;
  }
}
const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body as AccountNode
    const accountRepo = AppDataSource.getRepository(Account);
  }
  catch (err) {
    res.status(500).json({ err })
  }
};
export default { getAccountTree, deleteAccount, getFinalAccount, getParentAccount, getChildAccount,createAccount ,editAccount,getAccountStatement};