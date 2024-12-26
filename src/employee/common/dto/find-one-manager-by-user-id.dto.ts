import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class FindOneManagerByEmployeeId {
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    employeeId: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
