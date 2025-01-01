// import { Prisma } from '@prisma/client';
// import { DefaultArgs } from '@prisma/client/runtime/library';
import { UUID } from 'crypto';

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
            } /* as Prisma.sectionCreateInput */,
            include: {
                branch: true,
                manager: true,
            },
        };
    }

    update(data: UpdateSectionDto) /* : Prisma.sectionUpdateArgs */ {
        return {
            where: {
                id: data.id,
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

    count(branchId?: number) /* : Prisma.sectionCountArgs<DefaultArgs> */ {
        return {
            where: {
                ...(branchId ? { branch_id: branchId } : {}),
            },
        };
    }

    findAll(data: Omit<FindAllSectionsDto, 'page'> & { skip: number }) /*: Prisma.sectionFindManyArgs<DefaultArgs>*/ {
        return {
            where: {
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
