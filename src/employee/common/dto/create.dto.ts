import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateEmployeeDto {
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    businessId: number;

    @Min(1)
    @IsNumber()
    @IsOptional()
    branchId?: number;

    @Min(1)
    @IsNumber()
    @IsOptional()
    sectionId?: number;

    @IsNumber()
    @IsOptional()
    salary?: number;

    @Length(3, 30)
    @IsString()
    @IsNotEmpty()
    role: string;
}
