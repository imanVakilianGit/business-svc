import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { BranchService } from './branch.service';
import { CreateBranchDto } from './common/dto/create.dto';
// import { UpdateBranchDto } from './common/dto/update.dto';

@Controller()
export class BranchController {
    constructor(private readonly branchService: BranchService) {}

    @MessagePattern('create_branch')
    create(@Payload() dto: CreateBranchDto) {
        return this.branchService.create(dto);
    }

    // @MessagePattern('find_all_branch')
    // findAll() {
    //     return this.branchService.findAll();
    // }

    // @MessagePattern('find_one_branch')
    // findOne(@Payload() id: number) {
    //     return this.branchService.findOne(id);
    // }

    // @MessagePattern('update_branch')
    // update(@Payload() updateBranchDto: UpdateBranchDto) {
    //     return this.branchService.update(updateBranchDto.id, updateBranchDto);
    // }

    // @MessagePattern('active_de_active_branch')
    // remove(@Payload() id: number) {
    //     return this.branchService.remove(id);
    // }
}
