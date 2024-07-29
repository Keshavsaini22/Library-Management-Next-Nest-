import { Injectable } from "@nestjs/common";
import { UsersEntity } from "src/domain/users/users.entity";
import { CreateUserDto } from "src/features/users/dto/users.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {

    constructor(private dataSource: DataSource) {
        super(UsersEntity, dataSource.createEntityManager());
    }

    async createUser(data: CreateUserDto) {
       return await this.save(data);
    }
}