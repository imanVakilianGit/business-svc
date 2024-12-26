export class UserQueryBuilder {
    findOneById(id: number) /* : Prisma.userFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                id: id,
            },
        };
    }
}
