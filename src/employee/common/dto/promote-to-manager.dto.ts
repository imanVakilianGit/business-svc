import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PromoteEmployeeToManager {
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    employeeId: number;
}
