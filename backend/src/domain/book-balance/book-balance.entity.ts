import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BooksEntity } from "../books/books.entity";

@Entity('book-balance')
export class BookBalanceEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'uuid', default: () => 'uuid_generate_v4()', unique: true })
    uuid: string;

    @Column({ type: 'int', default: 0 })
    balance: number;

    @OneToOne(() => BooksEntity, (book) => book.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book_id: BooksEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date;
}
