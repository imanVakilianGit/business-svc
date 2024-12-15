import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './common/dto/create.dto';

@Controller()
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @MessagePattern('create_employee')
    create(@Payload() dto: CreateEmployeeDto) {
        return this.employeeService.create(dto);
    }
}
