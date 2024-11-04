import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { BusinessCategoryService } from './business-category.service';
import { CreateBusinessCategoryDto } from './common/dto/create.dto';
import { CreateBusinessCategoryResponseType } from './common/types/response-type/create-response.type';
import { FindOneByIdBusinessCategoryDto } from './common/dto/find-one-by-id.dto';
import { FindOneByIdBusinessCategoryResponseType } from './common/types/response-type/find-one-by-id-response.type';
import { FindOneBySlugBusinessCategoryResponseType } from './common/types/response-type/find-one-by-slug-response.type';
import { FindAllBusinessCategoryResponseType } from './common/types/response-type/find-all-response.type';
import { FindOneBySlugBusinessCategoryDto } from './common/dto/find-one-by-slug.dto';
import { findAllBusinessCategoryDto } from './common/dto/find-all.dto';

@Controller()
export class BusinessCategoryController {
    constructor(private readonly businessCategoryService: BusinessCategoryService) {}

    @MessagePattern('create_business_category')
    create(@Payload() createBusinessCategoryDto: CreateBusinessCategoryDto): Promise<CreateBusinessCategoryResponseType> {
        return this.businessCategoryService.create(createBusinessCategoryDto);
    }

    @MessagePattern('find_one_by_id_business_category')
    findOneById(
        @Payload() findOneByIdBusinessCategoryDto: FindOneByIdBusinessCategoryDto,
    ): Promise<FindOneByIdBusinessCategoryResponseType> {
        return this.businessCategoryService.findOneById(findOneByIdBusinessCategoryDto);
    }

    @MessagePattern('find_one_by_slug_business_category')
    findOneBySlug(
        @Payload() findOneBySlugBusinessCategoryDto: FindOneBySlugBusinessCategoryDto,
    ): Promise<FindOneBySlugBusinessCategoryResponseType> {
        return this.businessCategoryService.findOneBySlug(findOneBySlugBusinessCategoryDto);
    }

    @MessagePattern('find_all_business_category')
    findAll(@Payload() findAllBusinessCategoryDto: findAllBusinessCategoryDto): Promise<FindAllBusinessCategoryResponseType> {
        return this.businessCategoryService.findAll(findAllBusinessCategoryDto);
    }
}
