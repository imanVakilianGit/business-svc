import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateBranchDto {
    @Min(0)
    @IsNumber()
    @IsNotEmpty()
    businessId: number;

    @Min(0)
    @IsNumber()
    @IsNotEmpty()
    managerEmployeeCode: number;

    @Length(2, 30)
    @IsString()
    @IsNotEmpty()
    name: string;

    @Length(2, 10000)
    @IsString()
    @IsNotEmpty()
    description: string;
}
