import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { SectionService } from './section.service';
import { CreateSectionDto } from './common/dto/create.dto';

@Controller()
export class SectionController {
    constructor(private readonly sectionService: SectionService) {}

    @MessagePattern('create_section')
    create(@Payload() dto: CreateSectionDto) {
        return this.sectionService.create(dto);
    }
}
