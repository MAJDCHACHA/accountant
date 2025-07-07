import { Entity,Column,PrimaryGeneratedColumn ,ManyToOne,OneToMany,UpdateDateColumn,CreateDateColumn} from "typeorm";
import { User } from "./userModel";
import { Product } from "./product";
@Entity()
export class CompanyName{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"varchar",nullable:false})
    name:string
    @ManyToOne(()=>User,(user)=>user.companyName,{nullable:false})
    userId: User;
    @OneToMany(() => Product, (product) => product.companyId,{nullable:false})
    products: Product[]; // العلاقة العكسية مع Product
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
}
