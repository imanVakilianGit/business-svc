import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { BranchQueryBuilder } from '../db-prisma/query-builders/branch.query-builder';
import { BranchRepository } from '../db-prisma/repositories/branch.repository';
import { CreateBranchDto } from './common/dto/create.dto';
import { FindOneBranchByCodeDto } from './common/dto/find-one-by-code.dto';
import { FindOneBranchDto } from './common/dto/find-one.dto';
import { FindAllBranchesDto } from './common/dto/find-all.dto';
import { FAILED_BRANCH_NOT_FOUND } from './response/error/failed-public.result';
import { paginationResult } from '../common/function/patination-result.func';
import { omitObject } from '../common/function/omit-object';
import { SUCCESS_FIND_ONE_BRANCH_BY_CODE } from './response/success/success-find-one-by-code.result';
import { SUCCESS_FIND_ONE_BRANCH } from './response/success/success-find-one.result';
import { SUCCESS_FIND_ALL_BRANCHES } from './response/success/success-find-all.result';
import { SUCCESS_CREATE_BRANCH } from './response/success/success-create.result';
// import { UpdateBranchDto } from './common/dto/update.dto';

@Injectable()
export class BranchService {
    constructor(
        private readonly branchQueryBuilder: BranchQueryBuilder,
        private readonly branchRepository: BranchRepository,
    ) {}

    async create(dto: CreateBranchDto) {
        try {
            const code = randomUUID();

            const query = this.branchQueryBuilder.create({ ...dto, code });
            const databaseResult = await this.branchRepository.create(query);

            return SUCCESS_CREATE_BRANCH(databaseResult);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: FindAllBranchesDto | (FindAllBranchesDto & { skip: number })) {
        try {
            dto = { ...dto, skip: (dto.page - 1) * dto.limit };

            const totalCount = await this.branchRepository.count(this.branchQueryBuilder.count(dto.businessId));

            if (!totalCount) {
                return SUCCESS_FIND_ALL_BRANCHES(
                    paginationResult({
                        totalCount: 0,
                        limit: dto.limit,
                        page: dto.page,
                        count: 0,
                        resultFieldName: 'branches',
                        ResultValue: [],
                        sortBy: dto.sortBy,
                        orderBy: dto.orderBy,
                    }),
                );
            }

            const branches = await this.branchRepository.findAll(this.branchQueryBuilder.findAll(omitObject(dto, 'page')));

            return SUCCESS_FIND_ALL_BRANCHES(
                paginationResult({
                    totalCount,
                    limit: dto.limit,
                    page: dto.page,
                    count: branches.length,
                    resultFieldName: 'branches',
                    ResultValue: branches,
                    sortBy: dto.sortBy,
                    orderBy: dto.orderBy,
                }),
            );
        } catch (error) {
            throw error;
        }
    }

    async findOne(dto: FindOneBranchDto) {
        try {
            const branch = await this._findOneBranchWithActivationStatus(dto.id, true, 'yes');

            return SUCCESS_FIND_ONE_BRANCH(branch);
        } catch (error) {
            throw error;
        }
    }

    async findOneByCode(dto: FindOneBranchByCodeDto) {
        try {
            const query = this.branchQueryBuilder.findOneByCode(dto.code);
            const branch = await this.branchRepository.findFirst(query);

            if (!branch) throw new NotFoundException(FAILED_BRANCH_NOT_FOUND);

            return SUCCESS_FIND_ONE_BRANCH_BY_CODE(branch);
        } catch (error) {
            throw error;
        }
    }
    // ==================================================

    private async _findOneBranchWithActivationStatus(id: number, isActive: boolean, shouldExists?: 'yes' | 'no') {
        const query = this.branchQueryBuilder.findOneByIdWithActivationStatus(id, isActive);
        const branch = await this.branchRepository.findFirst(query);

        if (shouldExists) {
            if (shouldExists === 'yes') {
                if (!branch) throw new NotFoundException(FAILED_BRANCH_NOT_FOUND);
            } else if (shouldExists === 'no') {
                if (branch) throw new ConflictException(FAILED_BRANCH_NOT_FOUND);
            }
        }

        return branch;
    }
}
