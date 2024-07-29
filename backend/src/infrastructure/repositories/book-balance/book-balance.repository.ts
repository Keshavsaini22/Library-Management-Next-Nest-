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
}