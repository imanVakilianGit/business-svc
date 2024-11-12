import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CreateBusinessInputInterface } from '../../business/common/interface/input/create-input.interface';

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
}
