import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { DbPrismaModule } from '../db-prisma/db-prisma.module';

@Module({
    imports: [DbPrismaModule],
    controllers: [SectionController],
    providers: [SectionService],
})
export class SectionModule {}
