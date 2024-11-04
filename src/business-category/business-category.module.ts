import { Module } from '@nestjs/common';
import { BusinessCategoryService } from './business-category.service';
import { BusinessCategoryController } from './business-category.controller';
import { DbPrismaModule } from '../db-prisma/db-prisma.module';

@Module({
    imports: [DbPrismaModule],
    controllers: [BusinessCategoryController],
    providers: [BusinessCategoryService],
})
export class BusinessCategoryModule {}
