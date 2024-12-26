import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class FindOneEmployeeByUserId {
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
