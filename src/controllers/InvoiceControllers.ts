import { Request, Response } from "express";
import { AppDataSource } from "../lib/postgres";
import { Invoice } from "../entities/invoice";
import { InvoiceDetails } from "../entities/invoiceDetails";
import { Product } from "../entities/product";
import { JournalEntry } from "../entities/JournalEntry";
import { JournalEntryDetail } from "../entities/JournalDetails";
import { Account } from "@/entities/accountTree";
type invoice = {
  id: number;
  type: string;
  userId: number;
  branchId: number;
  journalEntryId: number;
  currency: string;
  TotalInvoice: number;
  typeInvoice: string;
  date: string;
  detailsProduct: Array<
    {
      amount: number;
      total: number;
      price: number;
      productId: number;
      invoiceId: number;
      pricePurchases: number;
      priceSales: number;
    }
  >
  details: Array<{
    accountId: number;
    debtor: number;
    creditor: number;
    currency?: string;
  }>;
  description?: string;
  typeJournal?: "accountant";
  status?: 'accept';

}

//  const createInvoice = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const invoiceRepo = AppDataSource.getRepository(Invoice);
//     const detailsRepo = AppDataSource.getRepository(InvoiceDetails);

//     const {
//       branchId,
//       userId,
//       date,
//       currency,
//       TotalInvoice,
//       typeInvoice,
//       journalEntryId,
//       details
//     } = req.body as invoice

//     // ✅ تحقق من الحقول الأساسية
//     if (
//       !branchId || !userId || !date || !currency || !TotalInvoice ||
//       !typeInvoice || !journalEntryId || !Array.isArray(details) || details.length === 0
//     ) {
//       res.status(400).json({ message: "Invalid or missing fields in request body" });
//       return;
//     }

//     // ✅ تحقق من تفاصيل الفاتورة
//     for (const item of details) {
//       if (
//         !item.productId ||
//         item.amount === undefined ||
//         item.price === undefined ||
//         item.total === undefined
//       ) {
//         res.status(400).json({ message: "Invalid invoice details: Missing fields" });
//         return;
//       }
//     }

//     // ✅ إنشاء الفاتورة
//     const newInvoice = invoiceRepo.create({
//       branchId,
//       userId,
//       date,
//       currency,
//       TotalInvoice,
//       typeInvoice,
//       journalEntryId
//     });

//     await invoiceRepo.save(newInvoice);

//     // ✅ إنشاء تفاصيل الفاتورة وربطها
//     const detailsEntities = details.map((item: any) =>
//       detailsRepo.create({
//         productId: item.productId,
//         amount: item.amount,
//         price: item.price,
//         total: item.total,
//         invoiceId: newInvoice.id
//       })
//     );

//     await detailsRepo.save(detailsEntities);

//     // ✅ استرجاع الفاتورة مع التفاصيل
//     const savedInvoice = await invoiceRepo.findOne({
//       where: { id: newInvoice.id },
//       relations: ["details"]
//     });

//     res.status(201).json({
//       message: "Invoice created successfully",
//       data: savedInvoice
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: (error as Error).message });
//   }
// };

const createInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const invoiceRepo = AppDataSource.getRepository(Invoice);
    const detailsRepo = AppDataSource.getRepository(InvoiceDetails);
    const productRepo = AppDataSource.getRepository(Product);
    const JournalRepo = AppDataSource.getRepository(JournalEntry)
    const journalDetail = AppDataSource.getRepository(JournalEntryDetail);
    const accountRepo=AppDataSource.getRepository(Account);
    const {
      branchId,
      userId,
      date,
      currency,
      TotalInvoice,
      typeInvoice,
      detailsProduct,
      details,
      description,
      typeJournal,
      status
    } = req.body as invoice;
    if (!branchId || !userId || !date || !currency || !TotalInvoice || !typeInvoice  || !Array.isArray(detailsProduct) || detailsProduct.length === 0 || !Array.isArray(details) || details.length <= 0 || !description || !status || !typeJournal) {
      res.status(400).json({ message: "Invalid or missing fields in request body" });
      return;
    }

    for (const item of detailsProduct) {
      if (
        !item.productId ||
        item.amount === undefined ||
        item.price === undefined ||
        item.total === undefined
      ) {
        res.status(400).json({ message: "Invalid invoice details: Missing fields" });
        return;
      }
    }
     const accountIds = details.map((d: any) => d.accountId);
    const accounts = await accountRepo.findByIds(accountIds);
    if (accounts.length !== accountIds.length) {
      res.status(203).json({ message: "One or more accountIds are invalid." });
      return;
    }
      const totalDebtor = details.reduce((sum: number, d: any) => sum + (d.debtor || 0), 0);
    const totalCreditor = details.reduce((sum: number, d: any) => sum + (d.creditor || 0), 0);
    if (totalDebtor !== totalCreditor) {
      res.status(400).json({ message: "Journal entry is not balanced. Debtor and Creditor must be equal." });
      return;
    }
        // Create JournalEntry
    const journalEntry = JournalRepo.create({
      date: date,
      description: description,
      userId: userId,
      branchId:branchId,
      currency: currency,
      status: status || "pending",
      type: typeJournal || "primary",
    });

    await JournalRepo.save(journalEntry);

      // Create JournalDetails
    const journalDetails = details.map((d: any) =>
      journalDetail.create({
        journalEntry,
        account: accounts.find(a => a.id === d.accountId),
        debtor: d.debtor,
        creditor: d.creditor,
        currency: d.currency || currency
      })
    );

    await journalDetail.save(journalDetails);
    const newInvoice = invoiceRepo.create({
      branchId,
      userId,
      date,
      currency,
      TotalInvoice,
      typeInvoice,
      journalEntryId:journalEntry.id
    });

    await invoiceRepo.save(newInvoice);

    const detailsEntities = detailsProduct.map((item: any) =>
      detailsRepo.create({
        productId: item.productId,
        amount: item.amount,
        price: item.price,
        total: item.total,
        invoiceId: newInvoice.id
      })
    );

    await detailsRepo.save(detailsEntities);

    for (const item of detailsProduct) {
      const product = await productRepo.findOneBy({ id: item.productId });

      if (!product) {
        res.status(203).json({ message: `Product with ID ${item.productId} not found` });
        return;
      }

      if (["sales", "return purchases"].includes(typeInvoice)) {
        product.amount = parseFloat(product.amount as any) + Number(item.amount);
      } else if (["purchases", "return sales"].includes(typeInvoice)) {
        if (product.amount < item.amount) {
          res.status(400).json({ message: `Insufficient product amount for product ID ${item.productId}` });
          return;
        }
        product.amount = parseFloat(product.amount as any) - Number(item.amount);
      }

      await productRepo.save(product);
    }

    const savedInvoice = await invoiceRepo.findOne({
      where: { id: newInvoice.id },
      relations: ["details"]
    });

    res.status(201).json({
      message: "Invoice created and product quantities updated successfully",
      data: savedInvoice
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};
const getInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: `get ` })
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
}
const updateInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: `update` })
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
}
const deleteInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: `delete` });
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
}
export default { createInvoice, getInvoice, updateInvoice, deleteInvoice };