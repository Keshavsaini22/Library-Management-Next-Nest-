import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateIsuuesDto, UpdateIsuuesDto } from "./dto/isuues.dto";
import { IssuesService } from "./issues.service";

@Controller('issues')
export class IssuesController {

    constructor(private readonly issuesService: IssuesService) { }

    @Post('/')
    async createIssue(@Body() body: CreateIsuuesDto) {
        return await this.issuesService.createIssue({ data: body });
    }

    @Get('/')
    async getAllIssues() {
        return await this.issuesService.getAllIssues();
    }

    @Patch('/:uuid')
    async updateIssue(@Param('uuid', ParseUUIDPipe) uuid: string,@Body() body: UpdateIsuuesDto) {
        return await this.issuesService.updateIssueStatus({ uuid, data: body });
    }

}