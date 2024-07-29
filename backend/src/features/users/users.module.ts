import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from 'src/infrastructure/repositories/users/users.repository';
import { UsersController } from './users.controller';

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService,UsersRepository],
})
export class UserModule { }
