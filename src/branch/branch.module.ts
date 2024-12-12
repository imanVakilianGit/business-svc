import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { DbPrismaModule } from '../db-prisma/db-prisma.module';

@Module({
    imports: [DbPrismaModule],
    controllers: [BranchController],
    providers: [BranchService],
})
export class BranchModule {}
