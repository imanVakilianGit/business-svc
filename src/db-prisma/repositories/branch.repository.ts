import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

import { DbPrismaService } from '../db-prisma.service';

@Injectable()
export class BranchRepository {
    constructor(private readonly prismaClient: DbPrismaService) {}

    async create<T extends Prisma.branchCreateArgs<DefaultArgs>>(data: T) {
        return await this.prismaClient.branch.create<T>(data as any);
    }

    async findFirst<T extends Prisma.branchFindFirstArgs<DefaultArgs>>(data: T) {
        return await this.prismaClient.branch.findFirst<T>(data as any);
    }
}
