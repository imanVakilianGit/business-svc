// import { Prisma } from '@prisma/client';
// import { DefaultArgs } from '@prisma/client/runtime/library';

import { CreateBranchDto } from '../../branch/common/dto/create.dto';

export class BranchQueryBuilder {
    findOneById(id: number) /* : Prisma.branchFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                id: id,
            },
        };
    }

    findOneByIdWithActivationStatusByManagerId(
        id: number,
        managerId: number,
        isActive: boolean,
    ) /*: Prisma.branchFindFirstArgs<DefaultArgs>*/ {
        return {
            where: {
                id,
                is_active: isActive,
                OR: [
                    {
                        manager_id: managerId,
                    },
                    {
                        business: {
                            manager_id: managerId,
                        },
                    },
                ],
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
