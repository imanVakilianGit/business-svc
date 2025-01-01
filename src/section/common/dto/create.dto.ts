import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateSectionDto {
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    branchId: number;

    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    managerId: number;

    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    businessId: number;

    @Length(3, 30)
    @IsString()
    @IsNotEmpty()
    name: string;

    @Length(3, 30)
    @IsString()
    @IsNotEmpty()
    description: string;
}
