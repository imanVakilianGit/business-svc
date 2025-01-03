import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

import { CreateBusinessDto } from '../../business/common/dto/create.dto';
import { FindAllBusinessDto } from '../../business/common/dto/find-all.dto';
import { UpdateBusinessInputInterface } from '../../business/common/interface/input/update-input.interface';

export class BusinessQueryBuilder {
    private readonly allDetailsSelectionFields: Prisma.businessSelect = {
        id: true,
        name: true,
        slug: true,
        created_at: true,
        updated_at: true,
        manager: {
            select: {
                id: true,
                employee: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        },
        business_category: {
            select: {
                title: true,
            },
        },
        options: {
            select: {
                id: true,
                title: true,
                value: true,
            },
        },
        extra_options: {
            select: {
                id: true,
                title: true,
                value: true,
            },
        },
    };

    create(data: CreateBusinessDto & { slug: string }): Prisma.businessCreateArgs<DefaultArgs> {
        return {
            data: <Prisma.businessCreateInput>{
                name: data.name,
                slug: data.slug,
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
            select: this.allDetailsSelectionFields,
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

    findById(id: number): Prisma.businessFindUniqueArgs<DefaultArgs> {
        return {
            where: {
                id,
            },
            select: this.allDetailsSelectionFields,
        };
    }

    findBySlug(slug: string): Prisma.businessFindUniqueArgs<DefaultArgs> {
        return {
            where: {
                slug,
            },
            select: this.allDetailsSelectionFields,
        };
    }

    update(data: UpdateBusinessInputInterface): Prisma.businessUpdateArgs<DefaultArgs> {
        let options: Array<Prisma.business_optionsUpdateArgs<DefaultArgs>> = [];
        if (data.options && data.options.length > 0) {
            options = data.options.map((option) => {
                return { where: { id: option.id }, data: { value: option.value } };
            });
        }

        let extraOptions: Array<Prisma.business_extra_optionsUpdateArgs<DefaultArgs>> = [];
        if (data.extraOptions && data.extraOptions.length > 0) {
            extraOptions = data.extraOptions.map((option) => {
                return { where: { id: option.id }, data: { title: option.title, value: option.value } };
            });
        }

        return {
            where: {
                id: data.id,
            },
            data: <Prisma.businessUpdateInput>{
                name: data.name,
                slug: data.slug,
                options: {
                    updateMany: options,
                },
                extra_options: {
                    updateMany: extraOptions,
                },
            },
            select: this.allDetailsSelectionFields,
        };
    }

    setManager(id: number, managerId: number): Prisma.businessUpdateArgs<DefaultArgs> {
        return {
            where: {
                id,
            },
            data: {
                manager: {
                    connect: {
                        id: managerId,
                    },
                },
            },
            select: this.allDetailsSelectionFields,
        };
    }
}
