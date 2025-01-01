import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { UUID } from 'crypto';

import { ActivationToggleSectionDto } from '../../section/common/dto/active-toggle.dto';
import { CreateSectionDto } from '../../section/common/dto/create.dto';
import { FindAllSectionsDto } from '../../section/common/dto/find-all.dto';
import { UpdateSectionDto } from '../../section/common/dto/update.dto';

export class SectionQueryBuilder {
    findOneById(id: number) /* : Prisma.sectionFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                id: id,
            },
            include: {
                branch: true,
                manager: true,
            },
        };
    }

    findOneByCode(code: string | UUID) /*: Prisma.sectionFindFirstArgs<DefaultArgs>*/ {
        return {
            where: {
                code,
                is_active: true,
            },
            include: {
                branch: true,
                manager: true,
            },
        };
    }

    findOneByIdWithActivationStatus(id: number, isActive: boolean) /* : Prisma.sectionFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                id: id,
                is_active: isActive,
            },
        };
    }

    create(data: CreateSectionDto & { code: string }) {
        return {
            data: {
                name: data.name,
                description: data.description,
                code: data.code,
                branch: {
                    connect: {
                        id: data.branchId,
                    },
                },
                business: {
                    connect: {
                        id: data.businessId,
                    },
                },
            } as Prisma.sectionCreateInput,
            include: {
                branch: true,
                manager: true,
            },
        };
    }

    update(data: UpdateSectionDto): Prisma.sectionUpdateArgs {
        return {
            where: {
                id: data.id,
                OR: [
                    {
                        manager_id: data.managerId,
                    },
                    {
                        branch: {
                            manager_id: data.managerId,
                        },
                    },
                    {
                        business: {
                            manager_id: data.managerId,
                        },
                    },
                ],
            },
            data: {
                ...(data.name ? { name: data.name } : {}),
                ...(data.description ? { description: data.description } : {}),
            } /*as Prisma.sectionUpdateInput*/,
            include: {
                branch: true,
                manager: true,
            },
        };
    }

    activationToggle(data: ActivationToggleSectionDto): Prisma.sectionUpdateArgs {
        return {
            where: {
                id: data.id,
                business: {
                    manager_id: data.managerId,
                },
            },
            data: {
                is_active: data.isActive,
            } /*as Prisma.sectionUpdateInput*/,
        };
    }

    count(data: { branchId?: number; managerId: number }): Prisma.sectionCountArgs<DefaultArgs> {
        return {
            where: {
                OR: [
                    {
                        branch: {
                            manager_id: data.managerId,
                        },
                    },
                    {
                        business: {
                            manager_id: data.managerId,
                        },
                    },
                ],
                ...(data.branchId ? { branch_id: data.branchId } : {}),
            },
        };
    }

    findAll(data: Omit<FindAllSectionsDto, 'page'> & { skip: number }) /*: Prisma.sectionFindManyArgs<DefaultArgs>*/ {
        return {
            where: {
                OR: [
                    {
                        branch: {
                            manager_id: data.managerId,
                        },
                    },
                    {
                        business: {
                            manager_id: data.managerId,
                        },
                    },
                ],
                ...(data.branchId ? { branch_id: data.branchId } : {}),
            },
            take: data.limit,
            skip: data.skip,
            orderBy: {
                [data.sortBy]: data.orderBy,
            },
        };
    }
}
