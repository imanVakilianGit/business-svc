import { Logger, Module } from '@nestjs/common';

import { DbPrismaService } from './db-prisma.service';
import { BusinessCategoryQueryBuilder } from './query-builders/business-category.query_builder';
import { BusinessCategoryRepository } from './repositories/business-category.repository';

@Module({
    providers: [DbPrismaService, Logger, BusinessCategoryQueryBuilder, BusinessCategoryRepository],
    exports: [BusinessCategoryQueryBuilder, BusinessCategoryRepository],
})
export class DbPrismaModule {}
