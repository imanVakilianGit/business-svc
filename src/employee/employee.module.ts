import { Module } from '@nestjs/common';

import { DbPrismaModule } from '../db-prisma/db-prisma.module';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

@Module({
    imports: [DbPrismaModule],
    controllers: [EmployeeController],
    providers: [EmployeeService],
})
export class EmployeeModule {}
