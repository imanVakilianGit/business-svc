import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CreateBusinessCategoryDto } from '../../business-category/common/dto/create.dto';
import { findAllBusinessCategoryDto } from '../../business-category/common/dto/find-all.dto';

export class BusinessCategoryQueryBuilder {
    findOneBySlug(slug: string): Prisma.business_categoryFindUniqueArgs<DefaultArgs> {
        return {
            where: {
                slug,
            },
        };
    }

    create(data: CreateBusinessCategoryDto & { slug: string }): Prisma.business_categoryCreateArgs<DefaultArgs> {
        const options: { title: string }[] = [];
        data.options.forEach((option) => options.push(option));
        return {
            data: {
                slug: data.slug as string,
                title: data.title,
                description: data.description,
                options_template: {
                    createMany: {
                        data: options,
                    },
                },
            },
            include: {
                options_template: true,
            },
        };
    }

    findOneById(id: number): Prisma.business_categoryFindUniqueArgs<DefaultArgs> {
        return {
            where: {
                id,
            },
        };
    }

    count(title?: string): Prisma.business_categoryCountArgs<DefaultArgs> {
        return {
            where: {
                ...(title ? { title: { contains: title } } : {}),
            },
        };
    }

    findAll(data: Omit<findAllBusinessCategoryDto, 'page'> & { skip: number }): Prisma.business_categoryFindManyArgs<DefaultArgs> {
        return {
            where: {
                ...(data.title ? { title: { contains: data.title } } : {}),
            },
            skip: data.skip,
            take: data.limit,
            orderBy: {
                [data.sortBy]: data.orderBy,
            },
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                created_at: true,
                updated_at: true,
            },
        };
    }

    findOneByIdWithDetail(id: number): Prisma.business_categoryFindUniqueArgs<DefaultArgs> {
        return {
            where: {
                id,
            },
            include: {
                options_template: true,
            },
        };
    }
}
