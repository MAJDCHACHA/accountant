import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { JournalEntry } from "@/entities/JournalEntry";
import { Account } from "@/entities/accountTree";

@Entity()
export class JournalDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JournalEntry, (entry) => entry.details, { nullable: false, onDelete: 'CASCADE' })
  journalEntry: JournalEntry;

  @ManyToOne(() => Account)
  account: Account;

  @Column({ type: "float", default: 0 })
  debtor: number;

  @Column({ type: "float", default: 0 })
  creditor: number;

  @Column({type:'varchar'})
  currency: string;
}
