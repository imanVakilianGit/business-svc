import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateSectionDto } from './common/dto/create.dto';
import { FindAllSectionsDto } from './common/dto/find-all.dto';
import { SectionService } from './section.service';

@Controller()
export class SectionController {
    constructor(private readonly sectionService: SectionService) {}

    @MessagePattern('create_section')
    create(@Payload() dto: CreateSectionDto) {
        return this.sectionService.create(dto);
    }

    @MessagePattern('find_all_sections')
    findAll(@Payload() dto: FindAllSectionsDto) {
        return this.sectionService.findAll(dto);
    }
}
