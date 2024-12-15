import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomInt } from 'crypto';

import { BusinessRepository } from '../db-prisma/repositories/business.repository';
import { BusinessQueryBuilder } from '../db-prisma/query-builders/business.query-builder';
import { BranchRepository } from '../db-prisma/repositories/branch.repository';
import { BranchQueryBuilder } from '../db-prisma/query-builders/branch.query-builder';
import { CreateEmployeeDto } from './common/dto/create.dto';
import { EmployeeQueryBuilder } from '../db-prisma/query-builders/employee.query-builder';
import { EmployeeRepository } from '../db-prisma/repositories/employee.repository';
import { FAILED_BUSINESS_NOT_FOUND } from '../business/responses/error/failed-public.result';
import { FAILED_SECTION_NOT_FOUND } from '../section/response/error/failed-public.result';
import { FAILED_BRANCH_NOT_FOUND } from '../branch/response/error/failed-public.result';
import { ManagerRepository } from '../db-prisma/repositories/manager.repository';
import { ManagerQueryBuilder } from '../db-prisma/query-builders/manager.query-builder';
import { PromoteEmployeeToManager } from './common/dto/promote-to-manager.dto';
import { SUCCESS_CREATE_EMPLOYEE } from './response/success/success-create.result';
import { SectionRepository } from '../db-prisma/repositories/section.repository';
import { SectionQueryBuilder } from '../db-prisma/query-builders/section.query-builder';
import { SUCCESS_PROMOTE_EMPLOYEE_TO_MANAGER } from './response/success/success-promote-to-manager.result';
import { UserRepository } from '../db-prisma/repositories/user.repository';
import { UserQueryBuilder } from '../db-prisma/query-builders/user.query-builder';
import {
    FAILED_EMPLOYEE_ALREADY_EXISTS,
    FAILED_EMPLOYEE_NOT_FOUND,
    FAILED_MANAGER_ALREADY_EXISTS,
    FAILED_MANAGER_NOT_FOUND,
    FAILED_USER_NOT_FOUND,
} from './response/error/failed-public.result';

@Injectable()
export class EmployeeService {
    constructor(
        private readonly employeeQueryBuilder: EmployeeQueryBuilder,
        private readonly employeeRepository: EmployeeRepository,
        private readonly userQueryBuilder: UserQueryBuilder,
        private readonly userRepository: UserRepository,
        private readonly businessQueryBuilder: BusinessQueryBuilder,
        private readonly businessRepository: BusinessRepository,
        private readonly branchQueryBuilder: BranchQueryBuilder,
        private readonly branchRepository: BranchRepository,
        private readonly sectionQueryBuilder: SectionQueryBuilder,
        private readonly sectionRepository: SectionRepository,
        private readonly managerQueryBuilder: ManagerQueryBuilder,
        private readonly managerRepository: ManagerRepository,
    ) {}

    async create(dto: CreateEmployeeDto | (CreateEmployeeDto & { employeeCode: string })) {
        try {
            await this._findOneUserOrFailById(dto.userId);
            await this._findOneBusinessOrFailById(dto.businessId);
            if (dto.branchId) await this._findOneBranchOrFailById(dto.branchId);
            if (dto.sectionId) await this._findOneSectionOrFailById(dto.sectionId);
            await this._checkExistenceEmployeeByUserIdWithActivationStatus(dto.userId, true, 'no');

            dto = {
                ...dto,
                employeeCode: randomInt(10000000, 99999999).toString(),
            };

            const query = this.employeeQueryBuilder.create(dto);
            const employee = await this.employeeRepository.create(query);

            return SUCCESS_CREATE_EMPLOYEE(employee);
        } catch (error) {
            throw error;
        }
    }

    async promoteToManger(dto: PromoteEmployeeToManager) {
        try {
            await this._checkExistenceEmployeeWithActivationStatus(dto.employeeId, true, 'yes');
            await this._checkExistenceManagerWithActivationStatus(dto.employeeId, true, 'no');

            const query = this.managerQueryBuilder.create(dto.employeeId);
            const manager = await this.managerRepository.create(query);
            console.log(manager);

            return SUCCESS_PROMOTE_EMPLOYEE_TO_MANAGER(manager);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // =============================================================================================================
    private async _checkExistenceEmployeeByUserIdWithActivationStatus(userId: number, isActive: boolean, shouldExists: 'yes' | 'no') {
        const query = this.employeeQueryBuilder.findOneByUserIdWithActivationStatus(userId, isActive);
        const employee = await this.employeeRepository.findFirst(query);

        if (shouldExists === 'yes') {
            if (!employee) throw new NotFoundException(FAILED_EMPLOYEE_NOT_FOUND);
        } else {
            if (employee) throw new ConflictException(FAILED_EMPLOYEE_ALREADY_EXISTS);
        }

        return employee;
    }

    private async _checkExistenceEmployeeWithActivationStatus(id: number, isActive: boolean, shouldExists: 'yes' | 'no') {
        const query = this.employeeQueryBuilder.findOneWithActivationStatus(id, isActive);
        const employee = await this.employeeRepository.findFirst(query);

        if (shouldExists === 'yes') {
            if (!employee) throw new NotFoundException(FAILED_EMPLOYEE_NOT_FOUND);
        } else {
            if (employee) throw new ConflictException(FAILED_EMPLOYEE_ALREADY_EXISTS);
        }

        return employee;
    }

    private async _checkExistenceManagerWithActivationStatus(employeeId: number, isActive: boolean, shouldExists: 'yes' | 'no') {
        const query = this.managerQueryBuilder.findOneByManagerIdWithActivationStatus(employeeId, isActive);
        const employee = await this.managerRepository.findFirst(query);

        if (shouldExists === 'yes') {
            if (!employee) throw new NotFoundException(FAILED_MANAGER_NOT_FOUND);
        } else {
            if (employee) throw new ConflictException(FAILED_MANAGER_ALREADY_EXISTS);
        }

        return employee;
    }

    private async _findOneUserOrFailById(id: number) {
        const query = this.userQueryBuilder.findOneById(id);
        const user = await this.userRepository.findFirst(query);
        if (!user) throw new NotFoundException(FAILED_USER_NOT_FOUND);

        return user;
    }

    private async _findOneBusinessOrFailById(id: number) {
        const query = this.businessQueryBuilder.findById(id);
        const business = await this.businessRepository.findFirst(query);
        if (!business) throw new NotFoundException(FAILED_BUSINESS_NOT_FOUND);

        return business;
    }

    private async _findOneBranchOrFailById(id: number) {
        const query = this.branchQueryBuilder.findOneById(id);
        const branch = await this.branchRepository.findFirst(query);
        if (!branch) throw new NotFoundException(FAILED_BRANCH_NOT_FOUND);

        return branch;
    }

    private async _findOneSectionOrFailById(id: number) {
        const query = this.sectionQueryBuilder.findOneById(id);
        const section = await this.sectionRepository.findFirst(query);
        if (!section) throw new NotFoundException(FAILED_SECTION_NOT_FOUND);

        return section;
    }
}
