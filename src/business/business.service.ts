import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { business, business_category_options_template } from '@prisma/client';

import { BusinessRepository } from '../db-prisma/repositories/business.repository';
import { BusinessQueryBuilder } from '../db-prisma/query-builders/business.query-builder';
import { BusinessCategoryQueryBuilder } from '../db-prisma/query-builders/business-category.query-builder';
import { BusinessCategoryRepository } from '../db-prisma/repositories/business-category.repository';
import { businessCategoryWithOptionsTemplateRelationType } from '../business-category/common/types/entity/business-category-entity.type';
import { CreateBusinessDto } from './common/dto/create.dto';
import { CreateBusinessResponseType } from './common/types/response-type/create-response.type';
import { FAILED_RELATION_BUSINESS_CATEGORY_NOT_FOUND } from './responses/error/failed-public.result';
import { FAILED_BUSINESS_ALREADY_EXIST, FAILED_RELATIONS_OF_BUSINESS_NOT_FOUND } from './responses/error/failed-create.result';
import { FindAllBusinessDto } from './common/dto/find-all.dto';
import { FindOneBusinessDto } from './common/dto/find-one.dto';
import { FindOneBySLugBusinessDto } from './common/dto/find-one-by-slug.dto';
import { slugifyStrings } from '../common/function/slugify.func';
import { SUCCESS_CREATE_BUSINESS } from './responses/success/success-create.result';
import { UpdateBusinessDto } from './common/dto/update.dto';

@Injectable()
export class BusinessService {
    constructor(
        private readonly businessQueryBuilder: BusinessQueryBuilder,
        private readonly businessRepository: BusinessRepository,
        private readonly businessCategoryQueryBuilder: BusinessCategoryQueryBuilder,
        private readonly businessCategoryRepository: BusinessCategoryRepository,
    ) {}

    async create(dto: CreateBusinessDto | (CreateBusinessDto & { slug: string })): Promise<CreateBusinessResponseType> {
        try {
            dto = { ...dto, slug: slugifyStrings(dto.name) };

            const optionsTemplate: business_category_options_template[] = await this._getOptionsTemplate(dto.businessCategoryId);
            const optionsTemplateTitles: string[] = optionsTemplate.map((optionTemplate) => optionTemplate.title);

            if (optionsTemplate.length !== dto.options.length) throw new BadRequestException();
            dto.options.forEach((option): void => {
                if (!optionsTemplateTitles.includes(option.title)) throw new BadRequestException();
            });

            const databaseResult: business = await this.businessRepository.create(this.businessQueryBuilder.create(dto));

            SUCCESS_CREATE_BUSINESS.data = databaseResult;
            return <CreateBusinessResponseType>SUCCESS_CREATE_BUSINESS;
        } catch (error) {
            if (error.code === 'P2002' && error.meta.target) {
                FAILED_BUSINESS_ALREADY_EXIST.field = error.meta.target;
                throw new ConflictException(FAILED_BUSINESS_ALREADY_EXIST);
            }
            if (error.code === 'P2025') {
                throw new NotFoundException(FAILED_RELATIONS_OF_BUSINESS_NOT_FOUND);
            }
            throw error;
        }
    }

    findAll(dto: FindAllBusinessDto) {
        return `This action returns all business` + dto;
    }

    findOne(dto: FindOneBusinessDto) {
        return `This action returns a #${dto} business`;
    }

    findOneBySlug(dto: FindOneBySLugBusinessDto) {
        return `This action returns a #${dto} business`;
    }

    update(dto: UpdateBusinessDto) {
        return `This action updates a #${dto} business`;
    }
    // ====================================================================================
    private async _getOptionsTemplate(businessCategoryId: number) {
        const businessCategory = await this.businessCategoryRepository.findUnique<businessCategoryWithOptionsTemplateRelationType>(
            this.businessCategoryQueryBuilder.findOneByIdWithDetail(businessCategoryId),
        );
        if (!businessCategory) throw new NotFoundException(FAILED_RELATION_BUSINESS_CATEGORY_NOT_FOUND);
        return businessCategory.options_template;
    }
}
