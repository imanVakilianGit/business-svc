// import { Prisma } from '@prisma/client';
// import { DefaultArgs } from '@prisma/client/runtime/library';

import { CreateEmployeeDto } from '../../employee/common/dto/create.dto';

export class EmployeeQueryBuilder {
    create(data: CreateEmployeeDto & { employeeCode: string }) /*: Prisma.employeeCreateArgs<DefaultArgs> */ {
        return {
            data: {
                user: {
                    connect: {
                        id: data.userId,
                    },
                },
                business: {
                    connect: {
                        id: data.businessId,
                    },
                },
                ...(data.branchId
                    ? {
                          branch: {
                              connect: {
                                  id: data.branchId,
                              },
                          },
                      }
                    : {}),
                ...(data.sectionId
                    ? {
                          section: {
                              connect: {
                                  id: data.sectionId,
                              },
                          },
                      }
                    : {}),
                employee_code: data.employeeCode,
                role: data.role,
                ...(data.salary ? { salary: data.salary } : {}),
            } /* as Prisma.employeeCreateInput */,
            include: {
                user: true,
                business: true,
                branch: true,
                section: true,
            },
        };
    }

    findOneByUserIdWithActivationStatus(userId: number, isActive: boolean) /* : Prisma.employeeFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                user_id: userId,
                is_active: isActive,
            },
        };
    }

    findOneByUserId(userId: number) /* : Prisma.employeeFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                user_id: userId,
            },
        };
    }

    findOneWithActivationStatus(id: number, isActive: boolean) /* : Prisma.employeeFindFirstArgs<DefaultArgs> */ {
        return {
            where: {
                id,
                is_active: isActive,
            },
        };
    }
}
