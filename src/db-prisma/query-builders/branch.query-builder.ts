// import { Prisma } from '@prisma/client';
// import { DefaultArgs } from '@prisma/client/runtime/library';

import { UUID } from 'crypto';
import { CreateBranchDto } from '../../branch/common/dto/create.dto';
import { FindAllBranchesDto } from '../../branch/common/dto/find-all.dto';

export class BranchQueryBuilder {
    findOneById(id: number) /* : Prisma.branchFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                id: id,
            },
        };
    }

    findOneByCode(code: string | UUID) /*: Prisma.branchFindFirstArgs<DefaultArgs>*/ {
        return {
            where: {
                code,
                is_active: true,
            },
            include: {
                business: true,
                section: true,
                manager: true,
            },
        };
    }

    findOneByIdWithActivationStatus(id: number, isActive: boolean) /* : Prisma.branchFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                id: id,
                is_active: isActive,
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

    count(businessId?: number) /* : Prisma.branchCountArgs<DefaultArgs> */ {
        return {
            where: {
                ...(businessId ? { business_id: businessId } : {}),
            },
        };
    }

    findAll(data: Omit<FindAllBranchesDto, 'page'> & { skip: number }) /*: Prisma.branchFindManyArgs<DefaultArgs>*/ {
        return {
            where: {
                ...(data.businessId ? { business_id: data.businessId } : {}),
            },
            take: data.limit,
            skip: data.skip,
            orderBy: {
                [data.sortBy]: data.orderBy,
            },
        };
    }
}
