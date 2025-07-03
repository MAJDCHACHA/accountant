import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Account } from "@/entities/accountTree";
@Entity()
export class AccountRelation {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Account, { nullable: false, onDelete: "CASCADE" })
  parent: Account;
  @ManyToOne(() => Account, { nullable: false, onDelete: "CASCADE" })
  child: Account;
}
