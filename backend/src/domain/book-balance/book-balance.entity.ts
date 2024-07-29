import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('book-balance')
export class BooksEntity {
    @PrimaryGeneratedColumn()
    id: number

    @PrimaryGeneratedColumn('uuid')
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
