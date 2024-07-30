import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsString, IsUUID } from "class-validator";
import { IssueStatus } from "src/domain/issues/issue-status";

export class CreateIsuuesDto {
    @IsString()
    @IsEnum(IssueStatus)
    status: IssueStatus

    @IsUUID()
    book_id: string

    @IsUUID()
    user_id: string
}

export class UpdateIsuuesDto extends PartialType(CreateIsuuesDto) { }