// import { Prisma } from '@prisma/client';
// import { DefaultArgs } from '@prisma/client/runtime/library';

import { CreateSectionDto } from '../../section/common/dto/create.dto';
import { FindAllSectionsDto } from '../../section/common/dto/find-all.dto';

export class SectionQueryBuilder {
    findOneById(id: number) /* : Prisma.userFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                id: id,
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
                business: true,
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
