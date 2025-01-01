import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ActivationToggleSectionDto } from './common/dto/active-toggle.dto';
import { CreateSectionDto } from './common/dto/create.dto';
import { FindAllSectionsDto } from './common/dto/find-all.dto';
import { FindOneSectionDto } from './common/dto/find-one.dto';
import { FindOneSectionByCodeDto } from './common/dto/find-one-by-code.dto';
import { SectionService } from './section.service';
import { UpdateSectionDto } from './common/dto/update.dto';

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

    @MessagePattern('find_one_section')
    findOne(@Payload() dto: FindOneSectionDto) {
        return this.sectionService.findOne(dto);
    }

    @MessagePattern('find_one_section_by_code')
    findOneByCode(@Payload() dto: FindOneSectionByCodeDto) {
        return this.sectionService.findOneByCode(dto);
    }

    @MessagePattern('update_section')
    update(@Payload() dto: UpdateSectionDto) {
        return this.sectionService.update(dto);
    }

    @MessagePattern('activation_toggle_section')
    activationToggle(@Payload() dto: ActivationToggleSectionDto) {
        return this.sectionService.activationToggle(dto);
    }
}
