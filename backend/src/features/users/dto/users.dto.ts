import { IsEnum, IsString, MaxLength } from "class-validator";
import { UserRole } from "src/domain/users/user-role";

export class CreateUserDto {
    @IsString()
    @MaxLength(250)
    name: string;

    @IsString()
    @MaxLength(320)
    email: string;

    @IsString()
    @IsEnum(UserRole)
    role: UserRole
}