import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IssueStatus } from "./issue-status";
import { UsersEntity } from "../users/users.entity";
import { BooksEntity } from "../books/books.entity";

@Entity('issues')
export class IssuesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'enum', enum: IssueStatus, default: IssueStatus.issued })
    status: IssueStatus;

    @ManyToOne(() => UsersEntity, (user) => user.id, { onDelete: 'CASCADE' })
    user_id: UsersEntity;

    @ManyToOne(() => BooksEntity, (book) => book.id, { onDelete: 'CASCADE' })
    book_id: BooksEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date;
}