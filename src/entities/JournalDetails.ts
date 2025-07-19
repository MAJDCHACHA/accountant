import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { JournalEntry } from "../entities/JournalEntry";
import { Account } from "../entities/accountTree";

// @Entity()
// export class JournalDetails {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @ManyToOne(() => JournalEntry, (entry) => entry.details, { nullable: false, onDelete: 'CASCADE' })
//   journalEntry: JournalEntry;
//   @ManyToOne(() => Account)
//   account: Account;
//   @Column({ type: "float", default: 0 })
//   debtor: number;
//   @Column({ type: "float", default: 0 })
//   creditor: number;
//   @Column({type:'varchar'})
//   currency: string;
// }
@Entity()
export class JournalEntryDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JournalEntry, journalEntry => journalEntry.details, { onDelete: "CASCADE" })
  @JoinColumn({ name: "journalEntryId" })
  journalEntry: JournalEntry;

  @Column()
  journalEntryId: number;

  @ManyToOne(() => Account, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "accountId" })
  account: Account;

  @Column()
  accountId: number;

  @Column("float")
  debtor: number;

  @Column("float")
  creditor: number;

  @Column()
  currency: string;
}

