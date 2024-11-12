import { Injectable } from '@nestjs/common';
import { business, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { DbPrismaService } from '../db-prisma.service';

@Injectable()
export class BusinessRepository {
    constructor(private readonly prismaClient: DbPrismaService) {}

    async create<T extends business>(data: Prisma.businessCreateArgs<DefaultArgs>): Promise<T> {
        return <T>await this.prismaClient.business.create(data);
    }
}
