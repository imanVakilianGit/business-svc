// import { Prisma } from '@prisma/client';
// import { DefaultArgs } from '@prisma/client/runtime/library';

export class ManagerQueryBuilder {
    create(employeeId: number) /* :Prisma.managerCreateArgs<DefaultArgs> */ {
        return {
            data: {
                employee: {
                    connect: {
                        id: employeeId,
                    },
                },
            } /*as Prisma.managerCreateInput*/,
            include: {
                employee: true,
            },
        };
    }

    findOneByManagerIdWithActivationStatus(employeeId: number, isActive: boolean) /*: Prisma.managerFindFirstArgs<DefaultArgs>*/ {
        return {
            where: {
                employee_id: employeeId,
                is_active: isActive,
            },
        };
    }
}
