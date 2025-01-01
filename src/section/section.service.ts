import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ActivationToggleSectionDto } from './common/dto/active-toggle.dto';
import { BranchQueryBuilder } from '../db-prisma/query-builders/branch.query-builder';
import { BranchRepository } from '../db-prisma/repositories/branch.repository';
import { CreateSectionDto } from './common/dto/create.dto';
import { FAILED_BRANCH_NOT_FOUND } from '../branch/response/error/failed-public.result';
import { FindOneSectionDto } from './common/dto/find-one.dto';
import { FAILED_SECTION_NOT_FOUND } from './response/error/failed-public.result';
import { FindAllSectionsDto } from './common/dto/find-all.dto';
import { FindOneSectionByCodeDto } from './common/dto/find-one-by-code.dto';
import { omitObject } from '../common/function/omit-object';
import { paginationResult } from '../common/function/patination-result.func';
import { SectionQueryBuilder } from '../db-prisma/query-builders/section.query-builder';
import { SectionRepository } from '../db-prisma/repositories/section.repository';
import { SUCCESS_CREATE_SECTION } from './response/success/success-create.result';
import { SUCCESS_FIND_ALL_SECTIONS } from './response/success/success-find-all.result';
import { SUCCESS_FIND_ONE_SECTION } from './response/success/success-find-one.result';
import { SUCCESS_FIND_ONE_SECTION_BY_CODE } from './response/success/success-find-one-by-code.result';
import { SUCCESS_UPDATE_SECTION } from './response/success/success-update.result';
import { SUCCESS_ACTIVATION_TOGGLE_SECTION } from './response/success/success-activation-toggle.result';
import { UpdateSectionDto } from './common/dto/update.dto';

@Injectable()
export class SectionService {
    constructor(
        private readonly branchQueryBuilder: BranchQueryBuilder,
        private readonly branchRepository: BranchRepository,
        private readonly sectionQueryBuilder: SectionQueryBuilder,
        private readonly sectionRepository: SectionRepository,
    ) {}

    async create(dto: CreateSectionDto) {
        try {
            await this._findOneActiveBranchOrFailByManagerId(dto.branchId, dto.managerId);
            const code = randomUUID();

            const query = this.sectionQueryBuilder.create({ ...dto, code });
            const section = await this.sectionRepository.create(query);

            return SUCCESS_CREATE_SECTION(section);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: FindAllSectionsDto | (FindAllSectionsDto & { skip: number })) {
        try {
            dto = { ...dto, skip: (dto.page - 1) * dto.limit };

            const totalCount: number | undefined = await this.sectionRepository.count(
                this.sectionQueryBuilder.count({ managerId: dto.managerId, branchId: dto.branchId }),
            );

            if (!totalCount) {
                return SUCCESS_FIND_ALL_SECTIONS(
                    paginationResult({
                        totalCount: 0,
                        limit: dto.limit,
                        page: dto.page,
                        count: 0,
                        resultFieldName: 'sections',
                        ResultValue: [],
                        sortBy: dto.sortBy,
                        orderBy: dto.orderBy,
                    }),
                );
            }

            const sections = await this.sectionRepository.findAll(this.sectionQueryBuilder.findAll(omitObject(dto, 'page')));

            return SUCCESS_FIND_ALL_SECTIONS(
                paginationResult({
                    totalCount,
                    limit: dto.limit,
                    page: dto.page,
                    count: sections.length,
                    resultFieldName: 'sections',
                    ResultValue: sections,
                    sortBy: dto.sortBy,
                    orderBy: dto.orderBy,
                }),
            );
        } catch (error) {
            throw error;
        }
    }

    async findOne(dto: FindOneSectionDto) {
        try {
            const section = await this._findOneSectionWithActivationStatus(dto.id, true, 'yes');

            return SUCCESS_FIND_ONE_SECTION(section);
        } catch (error) {
            throw error;
        }
    }

    async findOneByCode(dto: FindOneSectionByCodeDto) {
        try {
            console.log(dto);

            const query = this.sectionQueryBuilder.findOneByCode(dto.code);
            const section = await this.sectionRepository.findFirst(query);

            if (!section) throw new NotFoundException(FAILED_SECTION_NOT_FOUND);

            return SUCCESS_FIND_ONE_SECTION_BY_CODE(section);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateSectionDto) {
        try {
            await this._findOneSectionWithActivationStatus(dto.id, true, 'yes');

            const query = this.sectionQueryBuilder.update(dto);
            const updatedSection = await this.sectionRepository.update(query);

            return SUCCESS_UPDATE_SECTION(updatedSection);
        } catch (error) {
            throw error;
        }
    }

    async activationToggle(dto: ActivationToggleSectionDto) {
        try {
            await this._findOneSectionById(dto.id);

            const query = this.sectionQueryBuilder.activationToggle(dto);
            const updatedSection = await this.sectionRepository.update(query);

            return SUCCESS_ACTIVATION_TOGGLE_SECTION(updatedSection);
        } catch (error) {
            throw error;
        }
    }
    // ==============================================

    private async _findOneActiveBranchOrFailByManagerId(branchId: number, managerId: number) {
        const query = this.branchQueryBuilder.findOneByIdWithActivationStatusByManagerId(branchId, managerId, true);
        const branch = await this.branchRepository.findFirst(query);

        if (!branch) throw new NotFoundException(FAILED_BRANCH_NOT_FOUND);

        return branch;
    }

    private async _findOneSectionWithActivationStatus(id: number, isActive: boolean, shouldExists?: 'yes' | 'no') {
        const query = this.sectionQueryBuilder.findOneByIdWithActivationStatus(id, isActive);
        const section = await this.sectionRepository.findFirst(query);

        if (shouldExists) {
            if (shouldExists === 'yes') {
                if (!section) throw new NotFoundException(FAILED_SECTION_NOT_FOUND);
            } else if (shouldExists === 'no') {
                if (section) throw new ConflictException(FAILED_SECTION_NOT_FOUND);
            }
        }

        return section;
    }

    private async _findOneSectionById(id: number) {
        const query = this.sectionQueryBuilder.findOneById(id);
        const section = await this.sectionRepository.findFirst(query);

        if (!section) throw new NotFoundException(FAILED_SECTION_NOT_FOUND);

        return section;
    }
}
