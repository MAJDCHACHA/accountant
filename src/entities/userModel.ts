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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

