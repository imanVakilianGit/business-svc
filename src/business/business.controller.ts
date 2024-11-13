import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { BusinessService } from './business.service';
import { CreateBusinessDto } from './common/dto/create.dto';
import { CreateBusinessResponseType } from './common/types/response-type/create-response.type';
import { FindAllBusinessDto } from './common/dto/find-all.dto';
import { FindOneBusinessDto } from './common/dto/find-one.dto';
import { FindOneBySLugBusinessDto } from './common/dto/find-one-by-slug.dto';
import { FindAllBusinessResponseType } from './common/types/response-type/find-all-response.type';
import { UpdateBusinessDto } from './common/dto/update.dto';

@Controller()
export class BusinessController {
    constructor(private readonly businessService: BusinessService) {}

    @MessagePattern('create_business')
    create(@Payload() dto: CreateBusinessDto): Promise<CreateBusinessResponseType> {
        return this.businessService.create(dto);
    }

    @MessagePattern('find_all_business')
    findAll(@Payload() dto: FindAllBusinessDto): Promise<FindAllBusinessResponseType> {
        return this.businessService.findAll(dto);
    }

    @MessagePattern('find_one_business')
    findOne(@Payload() dto: FindOneBusinessDto) {
        return this.businessService.findOne(dto);
    }

    @MessagePattern('find_one_by_slug_business')
    findOneBySlug(@Payload() dto: FindOneBySLugBusinessDto) {
        return this.businessService.findOneBySlug(dto);
    }

    @MessagePattern('update_business')
    update(@Payload() updateBusinessDto: UpdateBusinessDto) {
        return this.businessService.update(updateBusinessDto);
    }
}
