import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, UpdateDateColumn, CreateDateColumn, JoinColumn } from "typeorm";
import { User } from "./userModel";
import { Product } from "./product";
// @Entity()
// export class CompanyName {
//     @PrimaryGeneratedColumn()
//     id: number;
//     @Column({ type: "varchar", nullable: false })
//     name: string
//     @ManyToOne(() => User, (user) => user.companyName, { nullable: false })
//     @JoinColumn({ name: "userId" })
//     user: User;
//     @Column()
//     userId: number;
//     @OneToMany(() => Product, (product) => product.company, { nullable: false })
//     products: Product[];
//     @CreateDateColumn()
//     createdAt!: Date;
//     @UpdateDateColumn()
//     updatedAt!: Date;
// }
@Entity()
export class CompanyName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.companies, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Product, product => product.company)
  products: Product[];
}
