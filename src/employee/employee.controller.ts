import { Controller } from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    // @MessagePattern('add_employee')
    // addEmployee(@Payload() dto: ) {
    //     return this.employeeService.addEmployee(dto);
    // }
}
