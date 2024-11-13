import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { OrderByEnum } from '../../../common/enum/order-by.enum';
import { FindAllBusinessCategorySortByEnum } from '../enum/find-all-sort-by.enum';

export class findAllBusinessCategoryDto extends PaginationDto {
    @IsEnum(OrderByEnum)
    @IsString()
    @IsOptional()
    orderBy: OrderByEnum = OrderByEnum.DESC;

    @IsEnum(FindAllBusinessCategorySortByEnum)
    @IsString()
    @IsOptional()
    sortBy: FindAllBusinessCategorySortByEnum = FindAllBusinessCategorySortByEnum.CREATED_AT;

    @Length(2, 20)
    @IsString()
    @IsOptional()
    title?: string;
}
