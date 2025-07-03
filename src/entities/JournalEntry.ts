import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,

} from "typeorm";
import { User } from "@/entities/userModel";
import { JournalDetails } from "@/entities/JournalDetails";


@Entity()
export class JournalEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column({type:'varchar', default:'' })
  description: string;

  @ManyToOne(() => User, (user) => user.journalEntries, { nullable: false })
  userId: User;  // هنا اسم الحقل هو userId لكنه يحتوي على نوع User (كيان)، وليس رقم

  @Column({
    type: "enum",
    enum: ["accept", "pending"],
    default: "pending",
  })
  status: "accept" | "pending";

  @Column({
    type: "enum",
    enum: ["primary", "accountant"],
    default: "primary",
  })
  type: "primary" | "accountant";

  @Column({type:'boolean', default: false })
  isDelete: boolean;

  @Column({type:'varchar', default: "USD"})
  currency: string;

  @OneToMany(() => JournalDetails, (detail) => detail.journalEntry)
  details: JournalDetails[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
