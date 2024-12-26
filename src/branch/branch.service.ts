import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { BranchQueryBuilder } from '../db-prisma/query-builders/branch.query-builder';
import { BranchRepository } from '../db-prisma/repositories/branch.repository';
import { CreateBranchDto } from './common/dto/create.dto';
import { SUCCESS_CREATE_BRANCH } from './responses/success/success-create.result';
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

    // findAll() {
    //     return `This action returns all branch`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} branch`;
    // }

    // update(id: number, updateBranchDto: UpdateBranchDto) {
    //     return `This action updates a #${id} branch`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} branch`;
    // }
}
