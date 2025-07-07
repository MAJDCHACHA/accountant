import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Account } from "../entities/accountTree";
import { JournalEntry } from "../entities/JournalEntry";
import { CompanyName } from "../entities/companyName";
import {Product} from '../entities/product'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 20 })
  username!: string;

  @Column({ unique: true, length: 20 })
  email!: string;

  @Column({ length: 100 })
  password!: string;

  @Column({ default: 'user' })
  role!: 'admin' | 'user';

  @Column({ nullable: true })
  refreshToken?: string;
 @OneToMany(() => Account, (account) => account.userId)
  accounts: Account[];
  @OneToMany(() => JournalEntry, (entry) => entry.userId)
  journalEntries: JournalEntry[];
  @OneToMany(()=>CompanyName,(companyName)=>companyName.userId)
  companyName:CompanyName[];
  @OneToMany(()=>Product,(product)=>product.userId)
  product:Product[];
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}

