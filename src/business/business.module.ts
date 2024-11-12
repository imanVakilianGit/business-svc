import { Module } from '@nestjs/common';

import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { DbPrismaModule } from '../db-prisma/db-prisma.module';

@Module({
    imports: [DbPrismaModule],
    controllers: [BusinessController],
    providers: [BusinessService],
})
export class BusinessModule {}
