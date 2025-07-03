import { Request, Response } from 'express';
import { statusCodes } from '@/utils/statusCode';
import { messages } from '@/utils/message';
import { Account } from "@/entities/accountTree"
import { AccountRelation } from '@/entities/accountDetails';
import { User } from '@/entities/userModel';
import { AppDataSource } from '@/lib/postgres';
type AccountNode = {
  id: number;
  name: string;
  name_en?: string;
  accountType?: string;
  isConfig?: boolean;
  currency?:string;
  parent?:number;
  parentFinalAccount?:number| null
  final_account?: boolean;
  userId?:number;
  children: AccountNode[];
};
const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, name_en, accountType, currency, parent,userId ,parentFinalAccount} = req.body as AccountNode;

    const accountRepo = AppDataSource.getRepository(Account);
    const relationRepo = AppDataSource.getRepository(AccountRelation);
    const userRepo=AppDataSource.getRepository(User);
    const newAccount = accountRepo.create({
      name,
      name_en,
      accountType,
      currency,
      userId:userRepo.create({id:userId}),
      parentFinalAccount: parentFinalAccount 
        ? await accountRepo.findOneBy({ id: parentFinalAccount }) 
        : null    });

    await accountRepo.save(newAccount);

    if (parent) {
      const parentAccount = await accountRepo.findOneBy({ id: parent });
      if (!parentAccount) {
        res.status(400).json({ error: "Parent account not found" });
        return;
      }
      const newRelation = relationRepo.create({
        parent: parentAccount,
        child: newAccount
      });

      await relationRepo.save(newRelation);
    }

    res.status(201).json({ success: true, account: newAccount });

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
      select: ['id', 'name','accountType']
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
    const accounts = await accountRepo.find({ where: { isParent: true }, select: ['id', 'name','accountType'] });
    res.status(200).json(accounts);
  }
  catch (err) {
    res.status(500).json(err);
  }
}
const editAccountTree = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name, name_en, parent, accountType, currency ,parentFinalAccount} = req.body as AccountNode;

    if (!id) {
      res.status(400).json({ error: "ID is required" });
      return;
    }

    const accountRepo = AppDataSource.getRepository(Account);
    const relationRepo = AppDataSource.getRepository(AccountRelation);

    const account = await accountRepo.findOneBy({ id });
    if (!account) {
      res.status(404).json({ error: "Account not found" });
      return;
    }

    account.name = name ?? account.name;
    account.name_en = name_en ?? account.name_en;
    account.accountType = accountType ?? account.accountType;
    account.currency = currency ?? account.currency;
if (parentFinalAccount !== undefined) {
      if (parentFinalAccount === null) {
        account.parentFinalAccount = null;
      } else {
        const finalAccount = await accountRepo.findOneBy({ id: parentFinalAccount });
        if (!finalAccount) {
          res.status(400).json({ error: "Parent final account not found" });
          return;
        }
        account.parentFinalAccount = finalAccount;
      }
    }    await accountRepo.save(account);


    await relationRepo.delete({ child: { id } });

    if (parent) {
      const parentAccount = await accountRepo.findOneBy({ id: parent });
      if (!parentAccount) {
        res.status(400).json({ error: "Parent account not found" });
        return;
      }

      const newRelation = relationRepo.create({
        parent: parentAccount,
        child: account
      });
      await relationRepo.save(newRelation);
    }

    res.status(200).json({ success: true, account });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err });
  }
};
const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body as AccountNode
    const accountRepo = AppDataSource.getRepository(Account);
  }
  catch (err) {
    res.status(500).json({ err })
  }
};
export default { getAccountTree, deleteAccount, getFinalAccount, getParentAccount, createAccount, editAccountTree }