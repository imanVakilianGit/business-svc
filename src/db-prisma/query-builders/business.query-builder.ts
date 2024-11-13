import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CreateBusinessInputInterface } from '../../business/common/interface/input/create-input.interface';
import { FindAllBusinessDto } from '../../business/common/dto/find-all.dto';

export class BusinessQueryBuilder {
    create(data: CreateBusinessInputInterface): Prisma.businessCreateArgs<DefaultArgs> {
        return {
            data: <Prisma.businessCreateInput>{
                name: data.name,
                slug: data.slug,
                owner: {
                    connect: {
                        id: data.ownerId,
                    },
                },
                business_category: {
                    connect: {
                        id: data.businessCategoryId,
                    },
                },
                options: {
                    createMany: {
                        data: data.options,
                    },
                },
                extra_options: {
                    createMany: {
                        data: data.extraOptions,
                    },
                },
            },
            include: {
                owner: true,
                business_category: true,
                options: true,
                extra_options: true,
            },
        };
    }

    count(name?: string): Prisma.businessCountArgs<DefaultArgs> {
        return {
            where: {
                ...(name ? { OR: [{ name: { contains: name } }, { slug: { contains: name } }] } : {}),
            },
        };
    }

    findAll(data: Omit<FindAllBusinessDto, 'page'> & { skip: number }): Prisma.businessFindManyArgs<DefaultArgs> {
        return {
            where: {
                ...(data.name ? { OR: [{ name: { contains: data.name } }, { slug: { contains: data.name } }] } : {}),
            },
            skip: data.skip,
            take: data.limit,
            orderBy: {
                [data.sortBy]: data.orderBy,
            },
            select: {
                id: true,
                name: true,
                slug: true,
                created_at: true,
                updated_at: true,
            },
        };
    }
}
