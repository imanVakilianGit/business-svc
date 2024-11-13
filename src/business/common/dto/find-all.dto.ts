import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

import { FindAllBusinessSortByEnum } from '../enum/find-all-sort-by.enum';
import { OrderByEnum } from '../../../common/enum/order-by.enum';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class FindAllBusinessDto extends PaginationDto {
    @IsEnum(OrderByEnum)
    @IsString()
    @IsOptional()
    orderBy: OrderByEnum = OrderByEnum.DESC;

    @IsEnum(FindAllBusinessSortByEnum)
    @IsString()
    @IsOptional()
    sortBy: FindAllBusinessSortByEnum = FindAllBusinessSortByEnum.CREATED_AT;

    @Length(2, 20)
    @IsString()
    @IsOptional()
    name?: string;
}
