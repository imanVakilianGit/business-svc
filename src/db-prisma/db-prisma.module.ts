import { Logger, Module } from '@nestjs/common';

import { BusinessCategoryQueryBuilder } from './query-builders/business-category.query-builder';
import { BusinessCategoryRepository } from './repositories/business-category.repository';
import { BusinessQueryBuilder } from './query-builders/business.query-builder';
import { BusinessRepository } from './repositories/business.repository';
import { BranchQueryBuilder } from './query-builders/branch.query-builder';
import { BranchRepository } from './repositories/branch.repository';
import { DbPrismaService } from './db-prisma.service';
import { EmployeeQueryBuilder } from './query-builders/employee.query-builder';
import { EmployeeRepository } from './repositories/employee.repository';
import { ManagerQueryBuilder } from './query-builders/manager.query-builder';
import { ManagerRepository } from './repositories/manager.repository';
import { SectionQueryBuilder } from './query-builders/section.query-builder';
import { SectionRepository } from './repositories/section.repository';
import { UserRepository } from './repositories/user.repository';
import { UserQueryBuilder } from './query-builders/user.query-builder';

@Module({
    providers: [
        DbPrismaService,
        Logger,
        BusinessCategoryQueryBuilder,
        BusinessCategoryRepository,
        BusinessQueryBuilder,
        BusinessRepository,
        EmployeeQueryBuilder,
        EmployeeRepository,
        UserQueryBuilder,
        UserRepository,
        BranchQueryBuilder,
        BranchRepository,
        SectionQueryBuilder,
        SectionRepository,
        ManagerQueryBuilder,
        ManagerRepository,
    ],
    exports: [
        BusinessCategoryQueryBuilder,
        BusinessCategoryRepository,
        BusinessQueryBuilder,
        BusinessRepository,
        EmployeeQueryBuilder,
        EmployeeRepository,
        UserQueryBuilder,
        UserRepository,
        BranchQueryBuilder,
        BranchRepository,
        SectionQueryBuilder,
        SectionRepository,
        ManagerQueryBuilder,
        ManagerRepository,
    ],
})
export class DbPrismaModule {}
