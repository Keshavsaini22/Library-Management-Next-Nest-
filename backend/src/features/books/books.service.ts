import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookBalanceRepository } from "src/infrastructure/repositories/book-balance/book-balance.repository";
import { BooksRepository } from "src/infrastructure/repositories/books/books.repository";
import { DataSource } from "typeorm";
import { CreateBookDto, UpdateBookDto } from "./dto/books.dto";

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

    async updateBook(payload: { uuid: string, data: UpdateBookDto }) {
        const { uuid, data } = payload;
        return await this.dataSource.transaction(async (manager) => {
            const { name, author, description, category, balance } = data;
            const bookResponse = await this.booksRepository.updateBook({ uuid, data: { name, author, description, category } }, manager);
            console.log('bookResponse: ', bookResponse);
            if (!bookResponse) throw new NotFoundException('Book not found');
            if (balance) {
                await this.bookBalanceRepository.updateBookBalance({ book_id: bookResponse.id, data: { balance } }, manager);
            }
            const updatedBook = await this.booksRepository.findBook({ uuid });
            return updatedBook;
        })
    }
}