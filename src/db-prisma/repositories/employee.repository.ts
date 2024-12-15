import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

import { DbPrismaService } from '../db-prisma.service';

@Injectable()
export class EmployeeRepository {
    constructor(private readonly prismaClient: DbPrismaService) {}

    async create<T extends Prisma.employeeCreateArgs<DefaultArgs>>(data: T) {
        return await this.prismaClient.employee.create<T>(data as any);
    }

    async findFirst<T extends Prisma.employeeFindFirstArgs<DefaultArgs>>(data: T) {
        return await this.prismaClient.employee.findFirst<T>(data as any);
    }
}
