import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Account } from "../entities/accountTree";
// @Entity()
// export class AccountRelation {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @ManyToOne(() => Account, { nullable: false, onDelete: "CASCADE" })
//   parent: Account;
//   @ManyToOne(() => Account, { nullable: false, onDelete: "CASCADE" })
//   child: Account;
// }

// @Entity()
// export class AccountRelation {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Account, { onDelete: "CASCADE" })
//   @JoinColumn({ name: "parent" })
//   parent: Account;
//   @Column()
//   parentId: number;
//   @ManyToOne(() => Account, { onDelete: "CASCADE" })
//   @JoinColumn({ name: "child" })
//   child: Account;
//   @Column()
//   childId: number;
// }
@Entity()
export class AccountRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "parentId" })  // اسم عمود المفتاح الخارجي
  parent: Account;
  @Column()
  parentId:number
  @ManyToOne(() => Account, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "childId" })  // اسم عمود المفتاح الخارجي
  child: Account;
  @Column()
  childId:number;
}
