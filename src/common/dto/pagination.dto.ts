import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
    @Min(1)
    @IsNumber()
    @IsOptional()
    page: number = 1;

    @Max(30)
    @Min(1)
    @IsNumber()
    @IsOptional()
    limit: number = 10;
}
