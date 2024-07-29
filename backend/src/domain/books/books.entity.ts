import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BooksCategory } from "./books-category";
import { IssuesEntity } from "../issues/issues.entity";
import { BookBalanceEntity } from "../book-balance/book-balance.entity";

@Entity('books')
export class BooksEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'uuid', default: () => 'uuid_generate_v4()', unique: true })
    uuid: string;

    @Column({ type: 'varchar', length: 250 })
    name: string;

    @Column({ type: 'varchar', length: 250 })
    author: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'enum', enum: BooksCategory })
    category: BooksCategory;

    @OneToOne(() => BookBalanceEntity, balance => balance.book_id, { cascade: true })
    balance: BookBalanceEntity;

    @OneToMany(() => IssuesEntity, issue => issue.book_id)
    issues: IssuesEntity[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date;
}
