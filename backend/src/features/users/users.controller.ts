import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/users.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post('/')
    async createUser(@Body() body: CreateUserDto) {
        return await this.usersService.createUser({data: body});
    }
}