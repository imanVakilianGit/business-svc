import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PromoteEmployeeToManagerDto {
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    employeeId: number;
}
