import { Entity,Column,ManyToOne,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, JoinColumn } from "typeorm";
import { Account } from "./accountTree";
@Entity()
export class AccountFinalParent{
    @PrimaryGeneratedColumn()
     id: number;
     @ManyToOne(() => Account, { onDelete: "CASCADE", nullable: false })
     @JoinColumn({ name: "finalId" })
     final: Account;
     @Column()
     finalId:number;
     @ManyToOne(() => Account, { onDelete: "CASCADE", nullable: false })
     @JoinColumn({ name: "childId" })
     child: Account;
     @Column()
     childId:number;

}