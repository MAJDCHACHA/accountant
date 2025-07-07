import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', nullable: false })
    type: string;
    @Column({ type: 'number', nullable: false })
    count: number;
    @Column({ type: 'number', nullable: false })
    price: number;
    @Column({ type: 'number', nullable: false })
    total: number;
    @Column({ type: 'number', nullable: false })
    TotalInvoice: number;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
}