export class BranchQueryBuilder {
    findOneById(id: number) /* : Prisma.userFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                id: id,
            },
        };
    }
}
