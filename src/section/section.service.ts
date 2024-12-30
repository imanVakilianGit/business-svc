import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { BranchQueryBuilder } from '../db-prisma/query-builders/branch.query-builder';
import { BranchRepository } from '../db-prisma/repositories/branch.repository';
import { CreateSectionDto } from './common/dto/create.dto';
import { FAILED_BRANCH_NOT_FOUND } from '../branch/response/error/failed-public.result';
import { SectionQueryBuilder } from '../db-prisma/query-builders/section.query-builder';
import { SectionRepository } from '../db-prisma/repositories/section.repository';
import { SUCCESS_CREATE_SECTION } from './response/success/success-create.result';

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
            console.log(dto);
            const code = randomUUID();

            const query = this.sectionQueryBuilder.create({ ...dto, code });
            const section = await this.sectionRepository.create(query);

            return SUCCESS_CREATE_SECTION(section);
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
}
