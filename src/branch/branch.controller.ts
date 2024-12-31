import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { BranchService } from './branch.service';
import { CreateBranchDto } from './common/dto/create.dto';
import { FindOneBranchByCodeDto } from './common/dto/find-one-by-code.dto';
import { FindOneBranchDto } from './common/dto/find-one.dto';
import { FindAllBranchesDto } from './common/dto/find-all.dto';
// import { UpdateBranchDto } from './common/dto/update.dto';

@Controller()
export class BranchController {
    constructor(private readonly branchService: BranchService) {}

    @MessagePattern('create_branch')
    create(@Payload() dto: CreateBranchDto) {
        return this.branchService.create(dto);
    }

    @MessagePattern('find_all_branches')
    findAll(@Payload() dto: FindAllBranchesDto) {
        return this.branchService.findAll(dto);
    }

    @MessagePattern('find_one_branch')
    findOne(@Payload() dto: FindOneBranchDto) {
        return this.branchService.findOne(dto);
    }

    @MessagePattern('find_one_branch_by_code')
    findOneByCode(@Payload() dto: FindOneBranchByCodeDto) {
        return this.branchService.findOneByCode(dto);
    }
}
