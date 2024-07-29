import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BooksCategory } from "./books-category";
import { IssuesEntity } from "../issues/issues.entity";

@Entity('books')
export class BooksEntity {
    @PrimaryGeneratedColumn()
    id: number

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 250 })
    name: string;

    @Column({ type: 'varchar', length: 250 })
    author: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'enum',enum:BooksCategory})
    category: BooksCategory;

    @OneToMany(()=>IssuesEntity,issue=>issue.book_id)
    issues:IssuesEntity[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date;
}
