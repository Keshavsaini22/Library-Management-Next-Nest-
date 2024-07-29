import { IsEnum, IsNumber, IsString, MaxLength } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { BooksCategory } from "src/domain/books/books-category";

export class CreateBookDto {

    @IsString()
    @MaxLength(250)
    name: string

    @IsString()
    @MaxLength(250)
    author: string

    @IsString()
    description: string

    @IsString()
    @IsEnum(BooksCategory)
    category: BooksCategory

    @IsNumber()
    balance: number
}

export class UpdateBookDto extends PartialType(CreateBookDto) { }