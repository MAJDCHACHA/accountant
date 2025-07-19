import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,

} from "typeorm";
import { User } from "../entities/userModel";
import { JournalEntryDetail } from "../entities/JournalDetails";
import { Invoice } from "./invoice";
import { Branch } from "./branch";
// @Entity()
// export class JournalEntry {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @Column()
//   date: string;
//   @Column({ type: 'varchar', default: '' })
//   description: string;
//   @ManyToOne(() => User, (user) => user.journalEntries, { nullable: false })
//   @JoinColumn({ name: "userId" })
//   user: User;  // هنا اسم الحقل هو userId لكنه يحتوي على نوع User (كيان)، وليس رقم
//   @Column()
//   userId: number;
//   @Column({
//     type: "enum",
//     enum: ["accept", "pending"],
//     default: "pending",
//   })
//   status: "accept" | "pending";
//   @Column({
//     type: "enum",
//     enum: ["primary", "accountant"],
//     default: "primary",
//   })
//   type: "primary" | "accountant";
//   @Column({ type: 'boolean', default: false })
//   isDelete: boolean;
//   @Column({ type: 'varchar', default: "USD" })
//   currency: string;
//   @OneToMany(() => JournalDetails, (detail) => detail.journalEntry)
//   details: JournalDetails[];
//   @OneToMany(() => Invoice, (invoice) => invoice.journalEntry)
//   invoices: Invoice[];
//   @CreateDateColumn()
//   createdAt: Date;
//   @UpdateDateColumn()
//   updatedAt: Date;
// }
@Entity()
export class JournalEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ["primary", "accountant"]
  })
  type: "primary" | "accountant";

  @Column({
    type: "enum",
    enum: ["accept", "pending"]
  })
  status: "accept" | "pending";

  @Column()
  date: string;

  @Column()
  currency: string;

  @Column({ default: false })
  isDelete: boolean;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, user => user.journalEntries, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => JournalEntryDetail, detail => detail.journalEntry)
  details: JournalEntryDetail[];
    @OneToMany(() => Invoice, (invoice) => invoice.journalEntry)
  invoices: Invoice[];

    @ManyToOne(()=>Branch,branch=>branch.journalEntry,{onDelete:'SET NULL'})
    @JoinColumn({name:'branchId'})
    branch:Branch
    @Column({nullable:true})
    branchId:number;
}
