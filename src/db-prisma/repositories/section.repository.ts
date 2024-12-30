import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

import { DbPrismaService } from '../db-prisma.service';

@Injectable()
export class SectionRepository {
    constructor(private readonly prismaClient: DbPrismaService) {}

    async create<T extends Prisma.sectionCreateArgs<DefaultArgs>>(data: T) {
        return await this.prismaClient.section.create<T>(data as any);
    }

    async findFirst<T extends Prisma.sectionFindFirstArgs<DefaultArgs>>(data: T) {
        return await this.prismaClient.section.findFirst<T>(data as any);
    }
}
