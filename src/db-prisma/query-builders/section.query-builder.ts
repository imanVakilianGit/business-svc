// import { Prisma } from '@prisma/client';
import { CreateSectionDto } from '../../section/common/dto/create.dto';

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
}
