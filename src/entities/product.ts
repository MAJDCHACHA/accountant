import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./userModel";
import { CompanyName } from "./companyName";
import { ProductDetails } from "./productDetails";
import { Branch } from "./branch";
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => CompanyName, company => company.products, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "companyId" })
  company: CompanyName;
  @Column()
  companyId: number;
  @ManyToOne(() => User, user => user.products, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "userId" })
  user: User;
  @Column()
  userId: number;
  // @OneToMany(()=>ProductDetails,productDetails=>productDetails.product)
  // details:ProductDetails
  @ManyToOne(() => Branch, branch => branch.product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'branchId' })
  branch: Branch
  @Column()
  branchId: number;
  @Column({ type: 'decimal', nullable: false })
  amount: number;
  @Column({ type: 'varchar', default: '' })
  description: string;
  @Column({ type: 'float', default: 0 })
  priceSales: number;
  @Column({ type: 'float', default: 0 })
  pricePurchases: number;
  @Column({type:'varchar',nullable:true})
  unit:string;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;

}
