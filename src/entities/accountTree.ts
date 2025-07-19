// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   CreateDateColumn,
//   UpdateDateColumn,
//   JoinColumn,
// } from "typeorm";
// import { User } from "../entities/userModel";
// import { Branch } from "./branch";
// // @Entity()
// // export class Account {
// //   @PrimaryGeneratedColumn()
// //   id: number;
// //   @Column({ type: "varchar", nullable: false, unique: true })
// //   name: string;
// //   @Column({ type: 'varchar', nullable: false, default: '' })
// //   name_en: string;
// //   @Column({ type: 'varchar' })
// //   accountType: string;
// //   @Column({ type: "varchar", default: 'USD' })
// //   currency: string;
// //   @Column({ type: 'boolean', nullable: false, default: false })
// //   final_account: boolean;
// //   @Column({ type: 'boolean', default: false })
// //   isConfig: boolean;
// //   @Column({ type: 'boolean', default: false })
// //   isParent: boolean;
// //   @Column({ type: Number, default: 0 })
// //   Ratio: Number;
// //   @Column({ type: Number, default: 0 })
// //   waring: Number;
// //   @Column({ type: 'boolean', default: false })
// //   isBlock: boolean;
// //   @ManyToOne(() => User, (user) => user.accounts, { nullable: false })
// //   @JoinColumn({ name: "userId" })
// //   user: User;
// //   @Column()
// //   userId: number;
// //   @ManyToOne(() => Account, { nullable: true })
// //   parentFinalAccount?: Account | null; // للحسابات الختامية
// //   @CreateDateColumn()
// //   createdAt: Date;
// //   @UpdateDateColumn()
// //   updatedAt: Date;
// // }
// @Entity()
// export class Account {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @Column({type:'varchar',nullable:false})
//   name: string;
//   @Column({type:'varchar',nullable:false, default:''})
//   name_en: string;
//   @Column({type:'boolean',default:false})
//   isParent: boolean;
//   @Column({type:'boolean',default:false})
//   isConfig: boolean;
//   @Column({type:'varchar'})
//   accountType: string;
//   @Column({type:'varchar',default:'USD'})
//   currency: string;
//   @Column({type:'varchar',default:false})
//   final_account: boolean;
//   @Column({type:'float',default:0})
//   Ratio: number;
//   @Column({type:'float',default:0})
//   waring: number;
//   @Column({type:'boolean',default:false})
//   isBlock: boolean;
//   @ManyToOne(() => Account, { nullable: true, onDelete: "SET NULL" })
//   @JoinColumn({ name: "parentFinalAccountId"})
//   parentFinalAccount: Account|null;
//   @ManyToOne(() => User, user => user.accounts, { onDelete: "RESTRICT" })
//   @JoinColumn({ name: "userId" })
//   user: User;
//   @Column()
//   userId: number;
//   @ManyToOne(()=>Branch,branch=>branch.accounts,{onDelete:'RESTRICT'})
//   @JoinColumn({name:'branchId'})
//   branch:Branch;
//   @Column()
//   branchId:number;
//   @CreateDateColumn()
//   createdAt: Date;
//   @UpdateDateColumn()
//   updatedAt: Date;
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "../entities/userModel";
import { Branch } from "./branch";
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type:'varchar',nullable:false})
  name: string;
  @Column({type:'varchar',nullable:false, default:''})
  name_en: string;
  @Column({type:'boolean',default:false})
  isParent: boolean;
  @Column({type:'boolean',default:false})
  isConfig: boolean;
  @Column({type:'varchar'})
  accountType: string;
  @Column({type:'varchar',default:'USD'})
  currency: string;
  @Column({type:'boolean',default:false})
  final_account: boolean;
  @Column({type:'float',default:0})
  Ratio: number;
  @Column({type:'float',default:0})
  waring: number;
  @Column({type:'boolean',default:false})
  isBlock: boolean;
  @ManyToOne(() => User, user => user.accounts, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "userId" })
  user: User;
  @Column()
  userId: number;
  @ManyToOne(()=>Branch,branch=>branch.accounts,{onDelete:'RESTRICT'})
  @JoinColumn({name:'branchId'})
  branch:Branch;
  @Column()
  branchId:number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

