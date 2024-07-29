import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BooksRepository } from "src/infrastructure/repositories/books/books.repository";
import { DataSource } from "typeorm";
import { CreateBookDto } from "./dto/books.dto";
import { BookBalanceRepository } from "src/infrastructure/repositories/book-balance/book-balance.repository";

@Injectable()
export class BooksService {

    constructor(
        @InjectRepository(BooksRepository) private booksRepository: BooksRepository,
        @InjectRepository(BookBalanceRepository) private bookBalanceRepository: BookBalanceRepository,
        private dataSource: DataSource
    ) { }

    async createBook(payload: { data: CreateBookDto }) {
        const { name, author, description, category, balance } = payload.data;
        return await this.dataSource.transaction(async (manager) => {
            const book = await this.booksRepository.createBook({ name, author, description, category, balance }, manager);
            const payload = {
                book_id: book.id,
                balance
            }
            const bookBalance = await this.bookBalanceRepository.createBookBalance(payload, manager);
            const data = {
                name: book.name,
                author: book.author,
                description: book.description,
                category: book.category,
                balance: bookBalance.balance
            }
            return data;
        })
    }

    async getBooks() {
        return await this.booksRepository.findAllBooks();
    }

    async getBook(payload: { uuid: string }) {
        const { uuid } = payload;
        return await this.booksRepository.findBook({ uuid });
    }

    async deleteBook(payload: { uuid: string }) {
        const { uuid } = payload;
        return await this.booksRepository.deleteBook({ uuid });
    }
}