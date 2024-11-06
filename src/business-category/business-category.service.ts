import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { business_category } from '@prisma/client';

import { businessCategoryListWithOptionsTemplateRelationType } from './common/types/entity/business-category-entity.type';
import { BusinessCategoryQueryBuilder } from '../db-prisma/query-builders/business-category.query_builder';
import { BusinessCategoryRepository } from '../db-prisma/repositories/business-category.repository';
import { CreateBusinessCategoryDto } from './common/dto/create.dto';
import { CreateBusinessCategoryResponseType } from './common/types/response-type/create-response.type';
import { FindOneByIdBusinessCategoryResponseType } from './common/types/response-type/find-one-by-id-response.type';
import { FAILED_BUSINESS_CATEGORY_ALREADY_EXIST } from './responses/error/failed-create.result';
import { FindOneByIdBusinessCategoryDto } from './common/dto/find-one-by-id.dto';
import { FAILED_BUSINESS_CATEGORY_NOT_FOUND } from './responses/error/failed-public.result';
import { FindOneBySlugBusinessCategoryResponseType } from './common/types/response-type/find-one-by-slug-response.type';
import { FindAllBusinessCategoryResponseType } from './common/types/response-type/find-all-response.type';
import { FindOneBySlugBusinessCategoryDto } from './common/dto/find-one-by-slug.dto';
import { findAllBusinessCategoryDto } from './common/dto/find-all.dto';
import { omitObject } from '../common/function/omit-object';
import { paginationResult } from '../common/function/patination-result.func';
import { slugifyStrings } from '../common/function/slugify.func';
import { SUCCESS_CREATE_BUSINESS_CATEGORY } from './responses/success/success-create.result';
import { SUCCESS_FIND_ONE_BY_ID_BUSINESS_CATEGORY } from './responses/success/success-find-one-by-id.result';
import { SUCCESS_FIND_ONE_BY_SLUG_BUSINESS_CATEGORY } from './responses/success/success-find-one-by-slug.result';
import { SUCCESS_FIND_ALL_BUSINESS_CATEGORY } from './responses/success/success-find-all.result';

@Injectable()
export class BusinessCategoryService {
    constructor(
        private readonly businessCategoryQueryBuilder: BusinessCategoryQueryBuilder,
        private readonly businessCategoryRepository: BusinessCategoryRepository,
    ) {}

    async create(dto: CreateBusinessCategoryDto): Promise<CreateBusinessCategoryResponseType> {
        try {
            dto.slug = dto.slug ? slugifyStrings(dto.slug) : slugifyStrings(dto.title);

            await this._checkExistBySlug(dto.slug);

            const databaseResult: businessCategoryListWithOptionsTemplateRelationType =
                await this.businessCategoryRepository.create<businessCategoryListWithOptionsTemplateRelationType>(
                    this.businessCategoryQueryBuilder.create(dto),
                );

            SUCCESS_CREATE_BUSINESS_CATEGORY.data = databaseResult;
            return <CreateBusinessCategoryResponseType>SUCCESS_CREATE_BUSINESS_CATEGORY;
        } catch (error) {
            throw error;
        }
    }

    async findOneById(dto: FindOneByIdBusinessCategoryDto): Promise<FindOneByIdBusinessCategoryResponseType> {
        try {
            const businessCategory: businessCategoryListWithOptionsTemplateRelationType = await this._findOneById(dto.id);

            SUCCESS_FIND_ONE_BY_ID_BUSINESS_CATEGORY.data = businessCategory;
            return <FindOneByIdBusinessCategoryResponseType>SUCCESS_FIND_ONE_BY_ID_BUSINESS_CATEGORY;
        } catch (error) {
            throw error;
        }
    }

    async findOneBySlug(dto: FindOneBySlugBusinessCategoryDto): Promise<FindOneBySlugBusinessCategoryResponseType> {
        try {
            const businessCategory: businessCategoryListWithOptionsTemplateRelationType = await this._findOneBySlug(dto.slug);

            SUCCESS_FIND_ONE_BY_SLUG_BUSINESS_CATEGORY.data = businessCategory;
            return <FindOneBySlugBusinessCategoryResponseType>SUCCESS_FIND_ONE_BY_SLUG_BUSINESS_CATEGORY;
        } catch (error) {
            throw error;
        }
    }

    async findAll(
        dto: findAllBusinessCategoryDto | ({ skip: number } & findAllBusinessCategoryDto),
    ): Promise<FindAllBusinessCategoryResponseType> {
        try {
            dto = { ...dto, skip: (dto.page - 1) * dto.limit };
            console.log('👽 ~ BusinessCategoryService ~ findAll ~ dto:', dto);

            const totalCount: number | undefined = await this.businessCategoryRepository.count(
                this.businessCategoryQueryBuilder.count(dto.title),
            );
            console.log('👽 ~ BusinessCategoryService ~ totalResult:', totalCount);
            if (!totalCount) {
                SUCCESS_FIND_ALL_BUSINESS_CATEGORY.data = paginationResult(0, dto.limit, dto.page, 0, 'businessCategories', []);
                return <FindAllBusinessCategoryResponseType>SUCCESS_FIND_ALL_BUSINESS_CATEGORY;
            }

            const result: business_category[] = await this.businessCategoryRepository.findAll<business_category>(
                this.businessCategoryQueryBuilder.findAllWithDetail(omitObject(dto, 'page')),
            );
            console.log('👽 ~ BusinessCategoryService ~ result:', result);
            SUCCESS_FIND_ALL_BUSINESS_CATEGORY.data = paginationResult(
                totalCount,
                dto.limit,
                dto.page,
                result.length,
                'businessCategories',
                result,
            );

            return <FindAllBusinessCategoryResponseType>SUCCESS_FIND_ALL_BUSINESS_CATEGORY;
        } catch (error) {
            throw error;
        }
    }

    // =====================================================================================
    private async _checkExistBySlug(slug: string): Promise<void> {
        const databaseResult: business_category = await this.businessCategoryRepository.findUnique<business_category>(
            this.businessCategoryQueryBuilder.findOneBySlug(slug),
        );
        if (databaseResult) throw new ConflictException(FAILED_BUSINESS_CATEGORY_ALREADY_EXIST);
    }

    private async _findOneBySlug(slug: string): Promise<businessCategoryListWithOptionsTemplateRelationType> {
        const databaseResult: businessCategoryListWithOptionsTemplateRelationType =
            await this.businessCategoryRepository.findUnique<businessCategoryListWithOptionsTemplateRelationType>(
                this.businessCategoryQueryBuilder.findOneBySlug(slug),
            );
        if (!databaseResult) throw new NotFoundException(FAILED_BUSINESS_CATEGORY_NOT_FOUND);
        return databaseResult;
    }

    private async _findOneById(id: number): Promise<businessCategoryListWithOptionsTemplateRelationType> {
        const databaseResult: businessCategoryListWithOptionsTemplateRelationType =
            await this.businessCategoryRepository.findUnique<businessCategoryListWithOptionsTemplateRelationType>(
                this.businessCategoryQueryBuilder.findOneById(id),
            );
        if (!databaseResult) throw new NotFoundException(FAILED_BUSINESS_CATEGORY_NOT_FOUND);
        return databaseResult;
    }
}
