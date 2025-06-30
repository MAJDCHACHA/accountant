import { Request, Response } from 'express';
import { statusCodes } from '@/utils/statusCode';
import { messages } from '@/utils/message';
import { Account } from "@/entities/accountTree"
import { AccountRelation } from '@/entities/accountDetails';
import { AppDataSource } from '@/lib/postgres';
type AccountNode = {
  id: number;
  name: string;
  name_en?: string;
  accountType?: string;
  isConfig?: boolean;
  final_account?: boolean;
  children: AccountNode[];
};

const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, name_en } = req.body as AccountNode;
  }
  catch (err) {

  }
}

const getAccountTree = async (req: Request, res: Response): Promise<void> => {
  try {
    const accountRepo = AppDataSource.getRepository(Account);
    const relationRepo = AppDataSource.getRepository(AccountRelation);

    const accounts = await accountRepo.find();
    const relations = await relationRepo.find({ relations: ["parent", "child"] });



    const nodeMap = new Map<number, AccountNode>();
    accounts.forEach(acc => {
      nodeMap.set(acc.id, {
        id: acc.id,
        name: acc.name,
        name_en: acc.name_en,
        accountType: acc.accountType,
        isConfig: acc.isConfig,

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

    res.json({ tree: roots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getFinalAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const accountRepo = AppDataSource.getRepository(Account);
    const accounts = await accountRepo.find({
      where: { final_account: true },
      select: ['id', 'name']
    })
    res.status(200).json(accounts);
  }
  catch (err) {
    res.status(500).json(err)
  }
};
const getParentAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const accountRepo = AppDataSource.getRepository(Account);
    const accounts = await accountRepo.find({ where: { isParent: true }, select: ['id', 'name'] });
    res.status(200).json(accounts);
  }
  catch (err) {
    res.status(500).json(err);
  }
}
const editAccountTree = async (req: Request, res: Response): Promise<void> => {

}


const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body as AccountNode
    const accountRepo = AppDataSource.getRepository(Account);

  }
  catch (err) {
    res.status(500).json({ err })
  }
}

export default { getAccountTree, deleteAccount, getFinalAccount, getParentAccount, createAccount, editAccountTree }