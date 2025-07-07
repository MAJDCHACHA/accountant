import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,OneToMany,ManyToOne } from "typeorm";
import { User } from "./userModel";
import { CompanyName } from "./companyName";
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "varchar", nullable: false })
    name: string
    @Column({ type: "varchar", default: '' })
    description: string
    @ManyToOne(()=>User,(user)=>user.product,{nullable:false})
    userId: User;  // هنا اسم الحقل هو userId لكنه يحتوي على نوع User (كيان)، وليس رقم
     @ManyToOne(() => CompanyName, (company) => company.products)
    companyId: CompanyName;// إضافة العلاقة مع CompanyName
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;

}