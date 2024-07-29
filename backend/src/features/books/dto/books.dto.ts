import { IsEnum, IsNumber, IsString, MaxLength } from "class-validator";
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