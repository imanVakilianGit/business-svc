import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './common/dto/create.dto';
import { PromoteEmployeeToManagerDto } from './common/dto/promote-to-manager.dto';
import { FindOneEmployeeByUserId } from './common/dto/find-one-by-user-id.dto';
import { FindOneManagerByEmployeeId } from './common/dto/find-one-manager-by-user-id.dto';

@Controller()
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @MessagePattern('create_employee')
    create(@Payload() dto: CreateEmployeeDto) {
        return this.employeeService.create(dto);
    }

    @MessagePattern('promote_employee_to_manager')
    promoteToManager(@Payload() dto: PromoteEmployeeToManagerDto) {
        return this.employeeService.promoteToManger(dto);
    }

    @MessagePattern('find_one_employee_by_user_id')
    findOneByUserId(@Payload() dto: FindOneEmployeeByUserId) {
        return this.employeeService.findOneByUserId(dto);
    }

    @MessagePattern('find_one_manager_by_employee_id')
    findOneManagerByEmployeeId(@Payload() dto: FindOneManagerByEmployeeId) {
        return this.employeeService.findOneManagerByEmployeeId(dto);
    }
}
