import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../entities/userModel";
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", nullable: false ,unique:true})
  name: string;
  @Column({type:'varchar',nullable:false, default:''})
  name_en:string;
  @Column({type:'varchar'})
  accountType: string;
  @Column({ type: "varchar", default: 'USD' })
  currency: string;
  @Column({type:'boolean', nullable:false,default:false})
  final_account:boolean;
  @Column({type:'boolean',default:false})
  isConfig:boolean;
  @Column({type:'boolean',default:false})
  isParent:boolean;
  @Column({type:Number,default:0})
  Ratio:Number;
  @Column({type:Number,default:0})
  waring:Number;
  @Column({type:'boolean',default:false})
  isBlock:boolean;
  @ManyToOne(() => User, (user) => user.accounts, { nullable: false })
  userId: User;
  @ManyToOne(() => Account, { nullable: true })
  parentFinalAccount?: Account| null; // للحسابات الختامية
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
