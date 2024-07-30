import { Injectable } from "@nestjs/common";
import { BookBalanceEntity } from "src/domain/book-balance/book-balance.entity";
import { DataSource, EntityManager, Repository } from "typeorm";

@Injectable()
export class BookBalanceRepository extends Repository<BookBalanceEntity> {

    constructor(private dataSource: DataSource) {
        super(BookBalanceEntity, dataSource.createEntityManager());
    }

    async createBookBalance(data: any, manager: EntityManager) {
        if (manager)
            return await manager.save(BookBalanceEntity, data);
        return await this.save(data);
    }

    async updateBookBalance(payload: { book_id: string|number, data: { balance: number } }, manager: EntityManager) {
        const { book_id, data } = payload;
        const querbuilder = manager ? manager.createQueryBuilder() : this.createQueryBuilder();
        const result = await querbuilder.update(BookBalanceEntity)
        .where("book_id = :book_id", { book_id: book_id })
        .set(data)
        .returning("*").execute();
        return result.affected > 0 ? result.raw[0] : null;
    }
}