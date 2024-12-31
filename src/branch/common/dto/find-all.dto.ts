import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { OrderByEnum } from '../../../common/enum/order-by.enum';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { SortEnum } from '../../../common/enum/sort.enum';

export class FindAllBranchesDto extends PaginationDto {
    @IsEnum(OrderByEnum)
    @IsString()
    @IsOptional()
    orderBy: OrderByEnum = OrderByEnum.DESC;

    @IsEnum(SortEnum)
    @IsString()
    @IsOptional()
    sortBy: SortEnum = SortEnum.CREATED_AT;

    @Min(1)
    @IsNumber()
    @IsOptional()
    businessId?: number;
}
