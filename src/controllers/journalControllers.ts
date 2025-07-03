import { Request, Response } from "express";
import { AppDataSource } from '@/lib/postgres';
import { JournalEntry } from "@/entities/JournalEntry";
import { JournalDetails } from "@/entities/JournalDetails";
import { User } from '@/entities/userModel';
import { Account } from "@/entities/accountTree";
type Journal = {
  id?: number;
  date: string;
  description?: string;
  userId: number;
  currency?: string;
  status?: "accept" | "pending";
  type?: "primary" | "accountant";
  details: Array<{
    accountId: number;
    debtor: number;
    creditor: number;
    currency?: string;
  }>;
}
const createJournal = async (req: Request, res: Response): Promise<void> => {
  const entryRepo = AppDataSource.getRepository(JournalEntry);
  const detailRepo = AppDataSource.getRepository(JournalDetails);
  const userRepo = AppDataSource.getRepository(User);
  const accountRepo = AppDataSource.getRepository(Account);

  try {
    const {
      date,
      description,
      userId,
      currency,
      status,
      type,
      details
    } = req.body as Journal;

    if (!date || !userId || !details || !Array.isArray(details) || details.length < 2) {
      res.status(400).json({ message: "Missing required fields or invalid details." });
      return;
    }

    // Check User
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    // Check that details have valid accounts
    const accountIds = details.map((d: any) => d.accountId);
    const accounts = await accountRepo.findByIds(accountIds);
    if (accounts.length !== accountIds.length) {
      res.status(400).json({ message: "One or more accountIds are invalid." });
      return;
    }

    // Check sum of debtor and creditor
    const totalDebtor = details.reduce((sum: number, d: any) => sum + (d.debtor || 0), 0);
    const totalCreditor = details.reduce((sum: number, d: any) => sum + (d.creditor || 0), 0);

    if (totalDebtor !== totalCreditor) {
      res.status(400).json({ message: "Journal entry is not balanced. Debtor and Creditor must be equal." });
      return;
    }

    // Create JournalEntry
    const journalEntry = entryRepo.create({
      date: date,
      description: description,
      userId: userRepo.create({ id: userId }),
      currency: currency,
      status: status || "pending",
      type: type || "primary",
    });

    await entryRepo.save(journalEntry);

    // Create JournalDetails
    const journalDetails = details.map((d: any) =>
      detailRepo.create({
        journalEntry,
        account: accounts.find(a => a.id === d.accountId),
        debtor: d.debtor,
        creditor: d.creditor,
        currency: d.currency || currency
      })
    );

    await detailRepo.save(journalDetails);

    res.status(201).json({
      message: "Journal entry created successfully.",
      journalEntryId: journalEntry.id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
};
const getJournal = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    const journalRepo = AppDataSource.getRepository(JournalEntry);

    const journals = await journalRepo
      .createQueryBuilder("journal")
      .leftJoinAndSelect("journal.details", "details")
      .leftJoinAndMapOne(
        "details.accountData",
        Account,
        "account",
        "account.id = details.accountId"
      )
      .select([
        "journal.id",
        "journal.date",
        "journal.description",
        "journal.status",
        "journal.type",
        "details.id",
        "details.debtor",
        "details.creditor",
        "account.id",
        "account.name"
      ])
      .orderBy("journal.date", "DESC")
      .skip(skip)
      .take(limit)
      .getMany();

    res.status(200).json(journals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};




const updateJournal = async (req: Request, res: Response): Promise<void> => {
  const entryRepo = AppDataSource.getRepository(JournalEntry);
  const detailRepo = AppDataSource.getRepository(JournalDetails);
  const accountRepo = AppDataSource.getRepository(Account);

  try {
    const {
      id,
      date,
      description,
      currency,
      status,
      type,
      details,
    } = req.body as Journal & { id: number };

    if (!id || !date || !details || !Array.isArray(details) || details.length < 2) {
      res.status(400).json({ message: "Missing required fields or invalid details." });
      return;
    }

    // Check JournalEntry exists
    const journalEntry = await entryRepo.findOne({
      where: { id },
      relations: ["details"], // if needed
    });
    if (!journalEntry) {
      res.status(404).json({ message: "Journal entry not found." });
      return;
    }



    // Validate accounts
    const accountIds = details.map(d => d.accountId);
    const accounts = await accountRepo.findByIds(accountIds);
    if (accounts.length !== accountIds.length) {
      res.status(400).json({ message: "One or more accountIds are invalid." });
      return;
    }

    // Validate debtor/creditor sums
    const totalDebtor = details.reduce((sum, d) => sum + (d.debtor || 0), 0);
    const totalCreditor = details.reduce((sum, d) => sum + (d.creditor || 0), 0);
    if (totalDebtor !== totalCreditor) {
      res.status(400).json({ message: "Journal entry is not balanced. Debtor and Creditor must be equal." });
      return;
    }

    // Update JournalEntry fields
    journalEntry.date = date;
    journalEntry.description = description || '';
    journalEntry.currency = currency || '';
    journalEntry.status = status || journalEntry.status;
    journalEntry.type = type || journalEntry.type;

    await entryRepo.save(journalEntry);

    // Delete old details before adding new ones (simplest approach)
    await detailRepo.delete({ journalEntry: { id: journalEntry.id } });

    // Create new details
    const newDetails = details.map(d =>
      detailRepo.create({
        journalEntry,
        account: accounts.find(a => a.id === d.accountId),
        debtor: d.debtor,
        creditor: d.creditor,
        currency: d.currency || currency,
      })
    );

    await detailRepo.save(newDetails);

    res.status(200).json({ message: "Journal entry updated successfully." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
};
const deleteJournal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body as Journal;

  }
  catch (err) {
    res.status(500).json(err)
  }
}
export default { createJournal, getJournal, updateJournal, deleteJournal }