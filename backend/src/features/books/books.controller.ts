import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/books.dto";

@Controller('books')
export class BooksController {

    constructor(private readonly booksService: BooksService) { }

    @Post('/')
    async createBook(@Body() body: CreateBookDto) {
        return await this.booksService.createBook({ data: body });
    }

    @Get('/')
    async getBooks() {
        return await this.booksService.getBooks();
    }

    @Get('/:uuid')
    async getBook(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return await this.booksService.getBook({ uuid });
    }

    @Delete('/:uuid')
    async deleteBook(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return await this.booksService.deleteBook({ uuid });
    }

}