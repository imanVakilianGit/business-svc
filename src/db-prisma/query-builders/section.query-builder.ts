export class SectionQueryBuilder {
    findOneById(id: number) /* : Prisma.userFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                id: id,
            },
        };
    }
}
