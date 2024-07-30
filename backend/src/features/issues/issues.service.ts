import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IssuesRepository } from "src/infrastructure/repositories/issues/issues.repository";
import { DataSource } from "typeorm";
import { CreateIsuuesDto, UpdateIsuuesDto } from "./dto/isuues.dto";
import { UsersRepository } from "src/infrastructure/repositories/users/users.repository";
import { BooksRepository } from "src/infrastructure/repositories/books/books.repository";
import { BookBalanceRepository } from "src/infrastructure/repositories/book-balance/book-balance.repository";
import { UpdateBookDto } from "../books/dto/books.dto";

@Injectable()
export class IssuesService {

    constructor(
        @InjectRepository(IssuesRepository) private issuesRepository: IssuesRepository,
        @InjectRepository(UsersRepository) private userRepository: UsersRepository,
        @InjectRepository(BooksRepository) private booksRepository: BooksRepository,
        @InjectRepository(BookBalanceRepository) private bookBalanceRepository: BookBalanceRepository,
        private dataSource: DataSource
    ) { }

    async createIssue(payload: { data: CreateIsuuesDto }) {
        const { status, book_id, user_id } = payload.data;
        return await this.dataSource.transaction(async (manager) => {
            const user = await this.userRepository.findUserByUuid({ uuid: user_id });
            const book = await this.booksRepository.findBook({ uuid: book_id });
            if (!book) throw new NotFoundException('Book not found');
            if (book.balance.balance < 1) throw new NotFoundException('Book balance not enough');
            const issue = await this.issuesRepository.createIssue({ status, book_id: book.id, user_id: user.id }, manager);
            await this.bookBalanceRepository.updateBookBalance({ book_id: book.id, data: { balance: book.balance.balance - 1 } }, manager);
            return issue;
        })
    }

    async getAllIssues() {
        return await this.issuesRepository.getAllIssues();
    }

    async updateIssueStatus(payload: { uuid: string, data: UpdateIsuuesDto }) {
        const { uuid, data } = payload;
        const response = await this.issuesRepository.updateIssueStatus({ uuid, data });
        if (!response) throw new NotFoundException('Issue not found');
        return response
    }
}