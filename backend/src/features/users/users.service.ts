import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "src/infrastructure/repositories/users/users.repository";
import { DataSource } from "typeorm";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
        private dataSource: DataSource
    ) { }

    async createUser(payload: { data: CreateUserDto }) {
        return await this.usersRepository.createUser(payload.data);
    }
}