import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

import { DbPrismaService } from '../db-prisma.service';

@Injectable()
export class SectionRepository {
    constructor(private readonly prismaClient: DbPrismaService) {}

    async findFirst<T extends Prisma.userFindFirstArgs<DefaultArgs>>(data: T) {
        return await this.prismaClient.user.findFirst<T>(data as any);
    }
}
