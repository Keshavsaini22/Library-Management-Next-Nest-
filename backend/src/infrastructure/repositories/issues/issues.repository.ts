import { Injectable, NotFoundException } from "@nestjs/common";
import { IssuesEntity } from "src/domain/issues/issues.entity";
import { UpdateBookDto } from "src/features/books/dto/books.dto";
import { UpdateIsuuesDto } from "src/features/issues/dto/isuues.dto";
import { DataSource, EntityManager, Repository } from "typeorm";

@Injectable()
export class IssuesRepository extends Repository<IssuesEntity> {
    constructor(private dataSource: DataSource) {
        super(IssuesEntity, dataSource.createEntityManager());
    }

    async createIssue(data: any, manager?: EntityManager) {
        if (manager) {
            return await manager.save(IssuesEntity, data);
        }
        return await this.save(data);
    }

    async getAllIssues() {
        // const res = await this.find({
        //     relations: ['user_id', 'book_id'],
        // });
        // console.log('res: ', res);

        //OR

        const issues = await this.createQueryBuilder('issue')
            .leftJoinAndSelect('issue.user_id', 'user')
            .leftJoinAndSelect('issue.book_id', 'book')
            .select([
                'issue',
                'user',
                'book',
            ])
            .getManyAndCount();
        if (issues[1] == 0) throw new NotFoundException('No content in table');
        return issues;
    }

    async updateIssueStatus(payload: { uuid: string, data: UpdateIsuuesDto }) {
        const { uuid, data } = payload;
        const result = await this.createQueryBuilder()
            .update(IssuesEntity)
            .set({ status: data.status })
            .where("uuid = :uuid", { uuid })
            .returning('*') // Return all columns of the updated row
            .execute();
        return result.affected > 0 ? result.raw[0] : null;

        //OR
        // const result = await this.update({ uuid }, { status: data.status });
    }
}