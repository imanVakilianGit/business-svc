import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { business, business_category_options_template } from '@prisma/client';
import { randomInt } from 'crypto';

import { BusinessRepository } from '../db-prisma/repositories/business.repository';
import { BusinessQueryBuilder } from '../db-prisma/query-builders/business.query-builder';
import { BusinessCategoryQueryBuilder } from '../db-prisma/query-builders/business-category.query-builder';
import { BusinessCategoryRepository } from '../db-prisma/repositories/business-category.repository';
import { BusinessWithDetailType } from './common/types/entity/business-with-detail.type';
import { businessCategoryWithOptionsTemplateRelationType } from '../business-category/common/types/entity/business-category-entity.type';
import { CreateBusinessDto } from './common/dto/create.dto';
import { CreateBusinessResponseType } from './common/types/response-type/create-response.type';
import { EmployeeRepository } from '../db-prisma/repositories/employee.repository';
import { EmployeeQueryBuilder } from '../db-prisma/query-builders/employee.query-builder';
import { FindAllBusinessDto } from './common/dto/find-all.dto';
import { FindOneByIdBusinessDto } from './common/dto/find-one.dto';
import { FindOneBySLugBusinessDto } from './common/dto/find-one-by-slug.dto';
import { FindAllBusinessResponseType } from './common/types/response-type/find-all-response.type';
import { FindOneBySlugBusinessResponseType } from './common/types/response-type/find-one-by-slug-response.type';
import { FindOneByIdBusinessResponseType } from './common/types/response-type/find-one-by-id-response.type';
import { FAILED_EMPLOYEE_NOT_FOUND } from '../employee/response/error/failed-public.result';
import { omitObject } from '../common/function/omit-object';
import { ManagerQueryBuilder } from '../db-prisma/query-builders/manager.query-builder';
import { ManagerRepository } from '../db-prisma/repositories/manager.repository';
import { paginationResult } from '../common/function/patination-result.func';
import { slugifyStrings } from '../common/function/slugify.func';
import { SUCCESS_CREATE_BUSINESS } from './responses/success/success-create.result';
import { SUCCESS_FIND_ALL_BUSINESS } from './responses/success/success-find-all.result';
import { SUCCESS_FIND_ONE_BY_ID_BUSINESS } from './responses/success/success-find-one-by-id.result';
import { SUCCESS_FIND_ONE_BY_SLUG_BUSINESS } from './responses/success/success-find-one-by-slug.result';
import { SUCCESS_UPDATE_BUSINESS } from './responses/success/success-update.result';
import { UpdateBusinessDto } from './common/dto/update.dto';
import { UpdateBusinessResponseType } from './common/types/response-type/update-response.type';
import {
    FAILED_BUSINESS_NOT_FOUND,
    FAILED_RELATIONS_OF_BUSINESS_NOT_FOUND,
    FAILED_BUSINESS_ALREADY_EXIST,
    FAILED_YOU_ARE_IN_A_BUSINESS_ALREADY,
} from './responses/error/failed-public.result';

@Injectable()
export class BusinessService {
    constructor(
        private readonly businessQueryBuilder: BusinessQueryBuilder,
        private readonly businessRepository: BusinessRepository,
        private readonly businessCategoryQueryBuilder: BusinessCategoryQueryBuilder,
        private readonly businessCategoryRepository: BusinessCategoryRepository,
        private readonly employeeQueryBuilder: EmployeeQueryBuilder,
        private readonly employeeRepository: EmployeeRepository,
        private readonly managerQueryBuilder: ManagerQueryBuilder,
        private readonly managerRepository: ManagerRepository,
    ) {}

    async create(dto: CreateBusinessDto | (CreateBusinessDto & { slug: string })): Promise<CreateBusinessResponseType> {
        try {
            await this._checkExistenceEmployeeByUserIdWithActivationStatus(dto.userId, true, 'no');

            dto = { ...dto, slug: slugifyStrings(dto.name) };

            const optionsTemplate: business_category_options_template[] = await this._getOptionsTemplate(dto.businessCategoryId);
            const optionsTemplateTitles: string[] = optionsTemplate.map((optionTemplate) => optionTemplate.title);

            if (optionsTemplate.length !== dto.options.length) throw new BadRequestException();
            dto.options.forEach((option): void => {
                if (!optionsTemplateTitles.includes(option.title)) throw new BadRequestException();
            });

            let business: business = await this.businessRepository.create(this.businessQueryBuilder.create(dto));
            const { manager } = await this._createEmployeeAndPromoteToManager(dto.userId, business.id);

            business = await this.businessRepository.update(this.businessQueryBuilder.setManager(business.id, manager.id));

            SUCCESS_CREATE_BUSINESS.data = business;
            return <CreateBusinessResponseType>SUCCESS_CREATE_BUSINESS;
        } catch (error) {
            if (error.code === 'P2002') {
                FAILED_BUSINESS_ALREADY_EXIST.field = error.meta?.target ?? '';
                throw new ConflictException(FAILED_BUSINESS_ALREADY_EXIST);
            }
            if (error.code === 'P2025') {
                throw new NotFoundException(FAILED_RELATIONS_OF_BUSINESS_NOT_FOUND);
            }
            throw error;
        }
    }

    async findAll(dto: FindAllBusinessDto | (FindAllBusinessDto & { skip: number })): Promise<FindAllBusinessResponseType> {
        try {
            dto = { ...dto, skip: (dto.page - 1) * dto.limit };

            const totalCount: number | undefined = await this.businessRepository.count(this.businessQueryBuilder.count(dto.name));

            if (!totalCount) {
                SUCCESS_FIND_ALL_BUSINESS.data = paginationResult({
                    totalCount: 0,
                    limit: dto.limit,
                    page: 0,
                    count: 0,
                    resultFieldName: 'businesses',
                    ResultValue: [],
                    sortBy: dto.sortBy,
                    orderBy: dto.orderBy,
                });
                return <FindAllBusinessResponseType>SUCCESS_FIND_ALL_BUSINESS;
            }

            const result: business[] = await this.businessRepository.findAll<business>(
                this.businessQueryBuilder.findAll(omitObject(dto, 'page')),
            );

            SUCCESS_FIND_ALL_BUSINESS.data = paginationResult({
                totalCount,
                limit: dto.limit,
                page: dto.page,
                count: result.length,
                resultFieldName: 'businesses',
                ResultValue: result,
                sortBy: dto.sortBy,
                orderBy: dto.orderBy,
            });

            return <FindAllBusinessResponseType>SUCCESS_FIND_ALL_BUSINESS;
        } catch (error) {
            throw error;
        }
    }

    async findOneById(dto: FindOneByIdBusinessDto): Promise<FindOneByIdBusinessResponseType> {
        try {
            const business: BusinessWithDetailType = await this._findOneOrFail(dto.id);

            SUCCESS_FIND_ONE_BY_ID_BUSINESS.data = business;
            return <FindOneByIdBusinessResponseType>SUCCESS_FIND_ONE_BY_ID_BUSINESS;
        } catch (error) {
            throw error;
        }
    }

    async findOneBySlug(dto: FindOneBySLugBusinessDto): Promise<FindOneBySlugBusinessResponseType> {
        try {
            const business: BusinessWithDetailType = await this._findOneOrFail(dto.slug);

            SUCCESS_FIND_ONE_BY_SLUG_BUSINESS.data = business;
            return <FindOneBySlugBusinessResponseType>SUCCESS_FIND_ONE_BY_SLUG_BUSINESS;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateBusinessDto & { slug?: string }): Promise<UpdateBusinessResponseType> {
        try {
            await this._findOneOrFail(dto.id);
            if (dto.name) dto.slug = slugifyStrings(dto.name);

            const databaseResult: BusinessWithDetailType = await this.businessRepository.update(this.businessQueryBuilder.update(dto));

            SUCCESS_UPDATE_BUSINESS.data = databaseResult;
            return <UpdateBusinessResponseType>SUCCESS_UPDATE_BUSINESS;
        } catch (error) {
            if (error.code === 'P2002') {
                FAILED_BUSINESS_ALREADY_EXIST.field = error.meta?.target ?? '';
                throw new ConflictException(FAILED_BUSINESS_ALREADY_EXIST);
            }
            if (error.code === 'P2025') {
                throw new NotFoundException(FAILED_RELATIONS_OF_BUSINESS_NOT_FOUND);
            }
            throw error;
        }
    }
    // ====================================================================================
    private async _getOptionsTemplate(businessCategoryId: number) {
        const businessCategory = await this.businessCategoryRepository.findUnique<businessCategoryWithOptionsTemplateRelationType>(
            this.businessCategoryQueryBuilder.findOneByIdWithDetail(businessCategoryId),
        );
        if (!businessCategory) throw new NotFoundException(FAILED_RELATIONS_OF_BUSINESS_NOT_FOUND);
        return businessCategory.options_template;
    }

    private async _findOneOrFail(id: number): Promise<BusinessWithDetailType>;
    private async _findOneOrFail(slug: string): Promise<BusinessWithDetailType>;
    private async _findOneOrFail(input: number | string): Promise<BusinessWithDetailType> {
        let queryBuilder;
        if (typeof input == 'number') queryBuilder = this.businessQueryBuilder.findById(input);
        else queryBuilder = this.businessQueryBuilder.findBySlug(input);
        const databaseResult: BusinessWithDetailType = await this.businessRepository.findUnique<BusinessWithDetailType>(queryBuilder);
        if (!databaseResult) throw new NotFoundException(FAILED_BUSINESS_NOT_FOUND);
        return databaseResult;
    }

    private async _checkExistenceEmployeeByUserIdWithActivationStatus(userId: number, isActive: boolean, shouldExists: 'yes' | 'no') {
        const query = this.employeeQueryBuilder.findOneByUserIdWithActivationStatus(userId, isActive);
        const employee = await this.employeeRepository.findFirst(query);

        if (shouldExists === 'yes') {
            if (!employee) throw new NotFoundException(FAILED_EMPLOYEE_NOT_FOUND);
        } else {
            if (employee) throw new ConflictException(FAILED_YOU_ARE_IN_A_BUSINESS_ALREADY);
        }

        return employee;
    }

    private async _createEmployeeAndPromoteToManager(userId: number, businessId: number) {
        const employeeCode: string = randomInt(10000000, 99999999).toString();

        const createEmployeeQuery = this.employeeQueryBuilder.create({ userId, businessId, employeeCode, role: 'manager' });
        const employee = await this.employeeRepository.create(createEmployeeQuery);

        const createManagerQuery = this.managerQueryBuilder.create(employee.id);
        const manager = await this.managerRepository.create(createManagerQuery);

        return {
            employee,
            manager,
        };
    }
}
