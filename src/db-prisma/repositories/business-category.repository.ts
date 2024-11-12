import { business_category, Prisma } from '@prisma/client';
import { DbPrismaService } from '../db-prisma.service';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BusinessCategoryRepository {
    constructor(private readonly prismaClient: DbPrismaService) {}

    async findUnique<T extends business_category>(data: Prisma.business_categoryFindUniqueArgs<DefaultArgs>): Promise<T> {
        return <T>await this.prismaClient.business_category.findUnique(data);
    }

    async create<T extends business_category>(data: Prisma.business_categoryCreateArgs<DefaultArgs>): Promise<T> {
        return <T>await this.prismaClient.business_category.create(data);
    }

    async findAll<T extends business_category>(data: Prisma.business_categoryFindManyArgs<DefaultArgs>): Promise<T[]> {
        return <T[]>await this.prismaClient.business_category.findMany(data);
    }

    async count(data: Prisma.business_categoryCountArgs<DefaultArgs>): Promise<number | undefined> {
        return await this.prismaClient.business_category.count(data);
    }
}
