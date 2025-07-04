import { AppDataSource } from "../lib/postgres";
import { Account } from "../entities/accountTree";
import { AccountRelation } from "../entities/accountDetails";
import { Repository } from "typeorm";

export const accountTree = [
  {
    name: "الموجودات",
    name_en: "Assets",
    accountType: "asset",
    isConfig: true,
    isParent:true,
    
    children: [
      {
        name: "الموجودات الثابتة",
        name_en: "Fixed Assets",
        accountType: "asset",
        isConfig: true,
        isParent:true,

        children: [
          {
            name: "الموجودات الثابتة غير الملموسة",
            name_en: "Intangible Fixed Assets",
            accountType: "asset",
            isConfig: true,
                isParent:true,

            children: [
              {
                name: "شهرة الشركة", name_en: "Goodwill", accountType: "asset", isConfig:true,
              },
              { name: "براءة الاختراع", name_en: "Patent", accountType: "asset", isConfig: true, },
              {
                name: "مصاريف التأسيس", name_en: "Establishment Expenses", accountType: "asset", isConfig: true,
              },
            ],
          },
          {
            name: "الموجودات الثابتة الملموسة",
            name_en: "Tangible Fixed Assets",
            accountType: "asset",
            isConfig: true,
                isParent:true,

            children: [
              {
                name: "مباني وأراضي", name_en: "Buildings and Land", accountType: "asset", isConfig: true,
              },
              {
                name: "عقارات", name_en: "Properties", accountType: "asset", isConfig: true,
              },
              {
                name: "أثاث ومفروشات", name_en: "Furniture and Fixtures", accountType: "asset", isConfig: true,
              },
              { name: "سيارات", name_en: "Vehicles", accountType: "asset", isConfig:true },
              {
                name: "تجهيزات ومعدات مكتبية", name_en: "Office Equipment", accountType: "asset", isConfig: true,
              },
            ],
          },
        ],
      },
      {
        name: "الموجودات المتداولة",
        name_en: "Current Assets",
        accountType: "asset",
        isConfig:true,
            isParent:true,

        children: [
          {
            name: "الزبائن",
            name_en: "Customers",
            accountType: "asset",
            isConfig:true,
                isParent:true,

          },
          { name: "مدينون مختلفون", name_en: "Other Debtors", accountType: "asset",isConfig:true, },
          { name: "مسحوبات الشركاء", name_en: "Partner Withdrawals", accountType: "asset",isConfig:true, },
          { name: "المخزون", name_en: "Inventory", accountType: "Inventory",isConfig:true, },
          { name: "أوراق القبض", name_en: "Notes Receivable", accountType: "asset" ,isConfig:true,},
          { name: "مصروفات مدفوعة مقدما", name_en: "Prepaid Expenses", accountType: "asset",isConfig:true, },
          { name: "مشاريع قيد التنفيذ", name_en: "Projects in Progress", accountType: "asset",isConfig:true, },
          { name: "اعتمادات مستندية", name_en: "Letters of Credit", accountType: "asset",isConfig:true, },
        ],
      },
      {
        name: "الأموال الجاهزة",
        name_en: "Cash and Banks",
        accountType: "asset",
        isConfig:true,
            isParent:true,

        children: [
          { name: "الصندوق", name_en: "Cash", accountType: "asset",isConfig:true, },
          { name: "المصرف", name_en: "Bank", accountType: "asset",isConfig:true, },
        ],
      },
    ],
  },

  {
    name: "المطاليب",
    name_en: "Liabilities",
    accountType: "liability",
    isConfig:true,
    isParent:true,

    children: [
      {
        name: "المطاليب الثابتة",
        name_en: "Long-term Liabilities",
        accountType: "liability",
        isConfig:true,
            isParent:true,

        children: [
          {
            name: "حقوق الملكية",
            name_en: "Equity",
            accountType: "liability",
            isConfig:true,
                isParent:true,

            children: [
              { name: "رأس المال", name_en: "Capital", accountType: "liability",isConfig:true, },
              { name: "الأرباح المحتجزة", name_en: "Retained Earnings", accountType: "liability",isConfig:true, },
              { name: "الاحتياطيات والمخصصات", name_en: "Reserves and Provisions", accountType: "liability",isConfig:true, },
            ],
          },
        ],
      },
      {
        name: "المطاليب المتداولة",
        name_en: "Current Liabilities",
        accountType: "liability",
        isConfig:true,
            isParent:true,

        children: [
          { name: "الموردون", name_en: "Suppliers", accountType: "liability",isConfig:true, },
          { name: "دائنون مختلفون", name_en: "Other Creditors", accountType: "liability",isConfig:true, },
          { name: "أوراق الدفع", name_en: "Notes Payable", accountType: "liability",isConfig:true, },
          { name: "مصروفات مستحقة", name_en: "Accrued Expenses", accountType: "liability",isConfig:true, },
          { name: "قروض قصيرة الأجل", name_en: "Short-term Loans", accountType: "liability",isConfig:true, },
          { name: "ضريبة القيمة المضافة", name_en: "VAT Payable", accountType: "liability",isConfig:true, },
        ],
      },
    ],
  },

  {
    name: "صافي المشتريات",
    name_en: "Net Purchases",
    accountType: "NetPurchases",
    isConfig:true,
        isParent:true,

    children: [
      { name: "المشتريات", name_en: "Purchases", accountType: "NetPurchases",isConfig:true },
      { name: "مردود المشتريات", name_en: "Purchase Returns", accountType: "NetPurchases",isConfig:true },
      { name: "مصاريف نقل المشتريات", name_en: "Purchase Freight", accountType: "NetPurchases",isConfig:true },
      { name: "خصم مكتسب", name_en: "Earned Discount", accountType: "NetPurchases",isConfig:true },
    ],
  },

  {
    name: "صافي المبيعات",
    name_en: "Net Sales",
    accountType: "NetSales",
    isConfig:true,
    isParent:true,


    children: [
      { name: "المبيعات", name_en: "Sales", accountType: "NetSales",isConfig:true },
      { name: "مردود المبيعات", name_en: "Sales Returns", accountType: "NetSales",isConfig:true },
      { name: "خصم ممنوح", name_en: "Allowed Discount", accountType: "NetSales",isConfig:true },
    ],
  },

  {
    name: "المصاريف",
    name_en: "Expenses",
    accountType: "expense",
    isConfig:true,
        isParent:true,

    children: [
      {
        name: "مصاريف بيع وتسويق",
        name_en: "Sales and Marketing Expenses",
        accountType: "expense",
        isConfig:true,
            isParent:true,

        children: [
          { name: "مصاريف المبيعات", name_en: "Sales Expenses", accountType: "expense",isConfig:true },
          { name: "عمولة المبيعات", name_en: "Sales Commission", accountType: "expense",isConfig:true },
          { name: "دعاية وإعلان", name_en: "Advertising", accountType: "expense",isConfig:true },
        ],
      },
      {
        name: "مصاريف إدارية وعمومية",
        name_en: "General and Administrative Expenses",
        accountType: "expense",
        isConfig:true,
            isParent:true,

        children: [
          { name: "رواتب وأجور", name_en: "Salaries and Wages", accountType: "expense" ,isConfig:true },
          { name: "كهرباء ومياه", name_en: "Electricity and Water", accountType: "expense" ,isConfig:true },
          { name: "هاتف وفاكس", name_en: "Phone and Fax", accountType: "expense"  ,isConfig:true},
          { name: "إكراميات وهدايا", name_en: "Tips and Gifts", accountType: "expense"  ,isConfig:true},
          { name: "نقل وانتقال", name_en: "Transport", accountType: "expense" ,isConfig:true },
          { name: "وقود ومحروقات", name_en: "Fuel and Lubricants", accountType: "expense"  ,isConfig:true},
          { name: "صيانة وقطع غيار", name_en: "Maintenance and Spare Parts", accountType: "expense" ,isConfig:true },
          { name: "قرطاسية ومطبوعات", name_en: "Stationery and Printing", accountType: "expense" ,isConfig:true },
          { name: "مصاريف متفرقة", name_en: "Miscellaneous Expenses", accountType: "expense" ,isConfig:true },
          { name: "الاستهلاك", name_en: "Depreciation", accountType: "expense"  ,isConfig:true},
        ],
      },
    ],
  },

  {
    name: "الإيرادات",
    name_en: "Revenues",
    accountType: "revenue",
    isConfig:true,
        isParent:true,

    children: [
      { name: "إيرادات مختلفة", name_en: "Miscellaneous Revenues", accountType: "revenue" ,isConfig:true},
      { name: "إيرادات استثمار", name_en: "Investment Revenues", accountType: "revenue",isConfig:true },
    ],
  },

  {
    name: "البضاعة",
    name_en: "Inventory",
    accountType: "Inventory",
    isConfig:true,
    isParent:true,

    children: [
      { name: "بضاعة آخر المدة", name_en: "Ending Inventory", accountType: "Inventory",isConfig:true },
    ],
  },

  {
    name: "الميزانية",
    name_en: "Balance Sheet",
    accountType: "BalanceSheet",
    final_account: true,
    isConfig:true,
        isParent:true,

  },
  {
    name: "الأرباح والخسائر",
    name_en: "Profit and Loss",
    accountType: "BalanceSheet",
    final_account: true,
    isConfig:true,
    isParent:true,
  
  },
  {
    name: "المتاجرة",
    name_en: "Trading Account",
    accountType: "BalanceSheet",
    final_account: true,
    isConfig:true,
    isParent:true,
  },
  {
    name: "التشغيل",
    name_en: "Operating Account",
    accountType: "BalanceSheet",
    final_account: true,
    isConfig:true,
    isParent:true,
  },
];


// type AccountNode = {
//   name: string;
//   name_en?: string;
//   accountType?: string;
//   isConfig?: boolean;
//   isParent?:boolean
//   final_account?:boolean;
//   children?: AccountNode[];
// };
// async function insertTree(
//   parent: Account | null,
//   node: AccountNode,
//   accountRepo: Repository<Account>,
//   relationRepo: Repository<AccountRelation>,
//   userId: number
// ): Promise<void> {
//   // ننشئ حساب جديد مع ربطه بالمستخدم userId
// const account = accountRepo.create({
//   name: node.name,
//   name_en: node.name_en,
//   accountType: node.accountType,
//   isConfig: node.isConfig ?? false,
//   final_account:node.final_account??false,
//   isParent:node.isParent??false,
//   userId: { id: userId },
// });
//   await accountRepo.save(account);

//   // إذا كان هناك أب parent، ننشئ العلاقة
//   if (parent) {
//     const relation = relationRepo.create({ parent, child: account });
//     await relationRepo.save(relation);
//   }

//   // إذا هناك أبناء children، نكرر العملية عليهم
//   if (node.children && node.children.length > 0) {
//     for (const child of node.children) {
//       await insertTree(account, child, accountRepo, relationRepo, userId);
//     }
//   }
// }

// export async function seedAccountTreeIfEmpty(userId: number): Promise<void> {
//   const dataSource = AppDataSource.isInitialized
//     ? AppDataSource
//     : await AppDataSource.initialize();

//   const accountRepo = dataSource.getRepository(Account);
//   const relationRepo = dataSource.getRepository(AccountRelation);

//   const count = await accountRepo.count();
//   if (count > 0) {
//     console.log("✅ شجرة الحسابات موجودة بالفعل، لا حاجة لإعادة إنشائها.");
//     return;
//   }

//   for (const rootNode of accountTree) {
//     await insertTree(null, rootNode, accountRepo, relationRepo, userId);
//   }

//   console.log("✅ تم إنشاء شجرة الحسابات بنجاح!");
// }
type AccountNode = {
  name: string;
  name_en?: string;
  accountType?: string;
  isConfig?: boolean;
  isParent?: boolean;
  final_account?: boolean;
  children?: AccountNode[];
};

// async function insertTree(
//   parent: Account | null,
//   node: AccountNode,
//   accountRepo: Repository<Account>,
//   relationRepo: Repository<AccountRelation>,
//   userId: number,
//   finalAccounts?: Record<string, Account> // خرائط للحسابات الختامية
// ): Promise<Account> { // نغير نوع الإرجاع ليكون Account
//   const account = accountRepo.create({
//     name: node.name,
//     name_en: node.name_en,
//     accountType: node.accountType,
//     isConfig: node.isConfig ?? false,
//     final_account: node.final_account ?? false,
//     isParent: node.isParent ?? false,
//     userId: { id: userId },
//     parentFinalAccount: null // نبدأ بقيمة null
//   });

//   await accountRepo.save(account);

//   // إذا كان هناك أب parent، ننشئ العلاقة العادية
//   if (parent) {
//     const relation = relationRepo.create({ parent, child: account });
//     await relationRepo.save(relation);
//   }

//   // ربط الحساب بالحساب الختامي المناسب (إذا كان حساب عادي وليس ختامي)
//   if (!node.final_account && finalAccounts) {
//     let finalAccount: Account | undefined;

//     // تحديد الحساب الختامي حسب نوع الحساب
//     switch(node.accountType) {
//       case 'asset':
//       case 'liability':
//       case 'Inventory':
//         finalAccount = finalAccounts['الميزانية'];
//         break;
//       case 'expense':
//       case 'revenue':
//       case 'NetPurchases':
//       case 'NetSales':
//         finalAccount = finalAccounts['الأرباح والخسائر'];
//         break;
//     }

//     if (finalAccount) {
//       account.parentFinalAccount = finalAccount;
//       await accountRepo.save(account);
//     }
//   }

//   // معالجة الأبناء
//   if (node.children && node.children.length > 0) {
//     for (const child of node.children) {
//       await insertTree(account, child, accountRepo, relationRepo, userId, finalAccounts);
//     }
//   }

//   return account; // نعيد الحساب الذي تم إنشاؤه
// }

// export async function seedAccountTreeIfEmpty(userId: number): Promise<void> {
//   const dataSource = AppDataSource.isInitialized
//     ? AppDataSource
//     : await AppDataSource.initialize();

//   const accountRepo = dataSource.getRepository(Account);
//   const relationRepo = dataSource.getRepository(AccountRelation);

//   const count = await accountRepo.count();
//   if (count > 0) {
//     console.log("✅ شجرة الحسابات موجودة بالفعل، لا حاجة لإعادة إنشائها.");
//     return;
//   }

//   // أولاً: إنشاء الحسابات الختامية وتخزينها
//   const finalAccounts: Record<string, Account> = {};
  
//   // إنشاء الحسابات الختامية أولاً
//   const finalAccountNodes = accountTree.filter(node => node.final_account);
//   for (const node of finalAccountNodes) {
//     const account = await insertTree(null, node, accountRepo, relationRepo, userId);
//     finalAccounts[node.name] = account;
//   }

//   // ثانياً: إنشاء باقي الحسابات مع الربط بالحسابات الختامية
//   const normalAccountNodes = accountTree.filter(node => !node.final_account);
//   for (const node of normalAccountNodes) {
//     await insertTree(null, node, accountRepo, relationRepo, userId, finalAccounts);
//   }

//   console.log("✅ تم إنشاء شجرة الحسابات بنجاح مع ربط الحسابات الختامية!");
// }
async function insertTree(
  parent: Account | null,
  node: AccountNode,
  accountRepo: Repository<Account>,
  relationRepo: Repository<AccountRelation>,
  userId: number,
  finalAccounts?: Record<string, Account>
): Promise<Account> {
  const account = accountRepo.create({
    name: node.name,
    name_en: node.name_en,
    accountType: node.accountType,
    isConfig: node.isConfig ?? false,
    final_account: node.final_account ?? false,
    isParent: node.isParent ?? false,
    userId: { id: userId },
    parentFinalAccount: null
  });

  await accountRepo.save(account);

  if (parent) {
    const relation = relationRepo.create({ parent, child: account });
    await relationRepo.save(relation);
  }

  if (!node.final_account && finalAccounts) {
    let finalAccount: Account | undefined;

    switch(node.accountType) {
      case 'asset':
      case 'liability':
      case 'Inventory':
        finalAccount = finalAccounts['الميزانية'];
        break;
      case 'expense':
      case 'revenue':
        finalAccount = finalAccounts['الأرباح والخسائر'];
        break;
      case 'NetPurchases':
      case 'NetSales':
        finalAccount = finalAccounts['المتاجرة'];
        break;
    }

    if (finalAccount) {
      await accountRepo.update(account.id, { parentFinalAccount: finalAccount });
      account.parentFinalAccount = finalAccount;
    }
  }

  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      await insertTree(account, child, accountRepo, relationRepo, userId, finalAccounts);
    }
  }

  return account;
}

export async function seedAccountTreeIfEmpty(userId: number): Promise<void> {
  const dataSource = AppDataSource.isInitialized
    ? AppDataSource
    : await AppDataSource.initialize();

  const accountRepo = dataSource.getRepository(Account);
  const relationRepo = dataSource.getRepository(AccountRelation);

  const count = await accountRepo.count();
  if (count > 0) {
    console.log("✅ شجرة الحسابات موجودة بالفعل، لا حاجة لإعادة إنشائها.");
    return;
  }

  const finalAccounts: Record<string, Account> = {};
  const finalAccountNames = [
    'الميزانية',
    'الأرباح والخسائر',
    'المتاجرة',
    'التشغيل'
  ];

  for (const accountName of finalAccountNames) {
    const node = accountTree.find(n => n.name === accountName);
    if (node) {
      const account = await insertTree(null, node, accountRepo, relationRepo, userId);
      finalAccounts[accountName] = account;
    }
  }

  const normalAccountNodes = accountTree.filter(node => !node.final_account);
  for (const node of normalAccountNodes) {
    await insertTree(null, node, accountRepo, relationRepo, userId, finalAccounts);
  }

  if (finalAccounts['المتاجرة'] && finalAccounts['الأرباح والخسائر']) {
    await relationRepo.save({
      parent: finalAccounts['الأرباح والخسائر'],
      child: finalAccounts['المتاجرة']
    });
  }

  if (finalAccounts['التشغيل'] && finalAccounts['الأرباح والخسائر']) {
    await relationRepo.save({
      parent: finalAccounts['الأرباح والخسائر'],
      child: finalAccounts['التشغيل']
    });
  }

  console.log("✅ تم إنشاء شجرة الحسابات بنجاح مع ربط جميع الحسابات الختامية!");
}