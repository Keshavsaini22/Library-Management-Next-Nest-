import { Module } from "@nestjs/common";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { BooksRepository } from "src/infrastructure/repositories/books/books.repository";
import { BookBalanceRepository } from "src/infrastructure/repositories/book-balance/book-balance.repository";

@Module({
    imports: [],
    controllers: [BooksController],
    providers: [BooksService, BooksRepository,BookBalanceRepository,]
})
export class BooksModule { }