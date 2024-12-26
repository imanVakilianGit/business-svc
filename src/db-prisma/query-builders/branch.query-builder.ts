// import { Prisma } from '@prisma/client';

import { CreateBranchDto } from '../../branch/common/dto/create.dto';

export class BranchQueryBuilder {
    findOneById(id: number) /* : Prisma.userFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                id: id,
            },
        };
    }

    create(data: CreateBranchDto & { code: string }) {
        return {
            data: {
                name: data.name,
                description: data.description,
                code: data.code,
                business: {
                    connect: {
                        id: data.businessId,
                    },
                },
                manager: {
                    connect: {
                        id: data.managerId,
                    },
                },
            } /* as Prisma.branchCreateInput */,
            include: {
                business: true,
                manager: true,
            },
        };
    }
}
