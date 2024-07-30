import { Injectable, NotFoundException } from "@nestjs/common";
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

    async findUserByUuid(payload: { uuid: string }) {
        const { uuid } = payload;
        const user= await this.findOne({ where: { uuid } });
        if(!user) throw new NotFoundException('User not found');
        return user;
    }
}