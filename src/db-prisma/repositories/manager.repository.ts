import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

import { DbPrismaService } from '../db-prisma.service';

@Injectable()
export class ManagerRepository {
    constructor(private readonly prismaClient: DbPrismaService) {}

    async create<T extends Prisma.managerCreateArgs<DefaultArgs>>(data: T) {
        return await this.prismaClient.manager.create<T>(data as any);
    }

    async findFirst<T extends Prisma.managerFindFirstArgs<DefaultArgs>>(data: T) {
        return await this.prismaClient.manager.findFirst<T>(data as any);
    }
}
