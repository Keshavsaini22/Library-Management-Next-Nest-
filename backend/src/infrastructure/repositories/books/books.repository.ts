import { Injectable, NotFoundException } from "@nestjs/common";
import { BooksEntity } from "src/domain/books/books.entity";
import { DataSource, EntityManager, Repository } from "typeorm";

@Injectable()
export class BooksRepository extends Repository<BooksEntity> {

    constructor(private dataSource: DataSource) {
        super(BooksEntity, dataSource.createEntityManager());
    }

    async createBook(data: any, manager?: EntityManager) {
        if (manager) {
            return await manager.save(BooksEntity, data);
        }
        return await this.save(data);
        //OR
        const book = this.create(data);
        if (manager) {
            return await manager.save(book);
        }
        return await this.save(book);
    }

    async findAllBooks() {
        const limit = 10;
        const page = 1;
        const skip = (page - 1) * limit;
        return await this.createQueryBuilder('book')
            .leftJoinAndSelect('book.balance', 'balance')
            .select(['book', 'balance.balance'])
            .orderBy('book.updatedAt', 'DESC')
            .skip(skip).take(limit)
            .getManyAndCount(); // prefer this
        //or
        // return await this.find({ relations: ['balance'] });
    }

    async findBook(payload: { uuid: string }) {
        const { uuid } = payload;
        return await this.createQueryBuilder('book')
            .leftJoinAndSelect('book.balance', 'balance')
            .select(['book', 'balance.balance'])
            .where('book.uuid = :uuid', { uuid })
            .getOne();
        //OR
        return await this.findOne({
            where: { uuid },
            relations: ['balance'],
        });
    }

    async deleteBook(payload: { uuid: string }) {
        const { uuid } = payload;
        // const book = await this.findOne({
        //     where: { uuid },
        // });
        // if (book) {
        //     await this.softRemove(book);
        //     return book;
        // }
        // throw new NotFoundException('Book not found');

        //Or

        const book = await this.findOne({ where: { uuid } });
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        book.deletedAt = new Date();
        await this.save(book);
        return book;
    }

    async updateBook(payload: { uuid: string, data: any }, manager?: EntityManager) {
        const { uuid, data } = payload;
        const querbuilder = manager ? manager.createQueryBuilder() : this.createQueryBuilder();
        const result = await querbuilder.update(BooksEntity)
            .where("uuid = :uuid", { uuid: uuid })
            .set(data)
            .returning("*").execute();
        return result.affected > 0 ? result.raw[0] : null;
    }
}