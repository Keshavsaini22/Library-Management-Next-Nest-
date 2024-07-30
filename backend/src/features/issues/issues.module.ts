import { Module } from "@nestjs/common";
import { IssuesService } from "./issues.service";
import { IssuesController } from "./issues.controller";
import { IssuesRepository } from "src/infrastructure/repositories/issues/issues.repository";
import { UsersRepository } from "src/infrastructure/repositories/users/users.repository";
import { BooksRepository } from "src/infrastructure/repositories/books/books.repository";
import { BookBalanceRepository } from "src/infrastructure/repositories/book-balance/book-balance.repository";

@Module({
    imports: [],
    controllers: [IssuesController],
    providers: [IssuesService,IssuesRepository,UsersRepository,BooksRepository,BookBalanceRepository],
})
export class IssuesModule { }