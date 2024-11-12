import { Logger, Module } from '@nestjs/common';

import { DbPrismaService } from './db-prisma.service';
import { BusinessCategoryQueryBuilder } from './query-builders/business-category.query-builder';
import { BusinessCategoryRepository } from './repositories/business-category.repository';
import { BusinessQueryBuilder } from './query-builders/business.query-builder';
import { BusinessRepository } from './repositories/business.repository';

@Module({
    providers: [
        DbPrismaService,
        Logger,
        BusinessCategoryQueryBuilder,
        BusinessCategoryRepository,
        BusinessQueryBuilder,
        BusinessRepository,
    ],
    exports: [BusinessCategoryQueryBuilder, BusinessCategoryRepository, BusinessQueryBuilder, BusinessRepository],
})
export class DbPrismaModule {}
