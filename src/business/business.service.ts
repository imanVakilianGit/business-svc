import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './common/dto/create.dto';
import { UpdateBusinessDto } from './common/dto/update.dto';
import { FindAllBusinessDto } from './common/dto/find-all.dto';
import { FindOneBusinessDto } from './common/dto/find-one.dto';
import { FindOneBySLugBusinessDto } from './common/dto/find-one-by-slug.dto';

@Injectable()
export class BusinessService {
    create(dto: CreateBusinessDto) {
        return 'This action adds a new business' + dto;
    }

    findAll(dto: FindAllBusinessDto) {
        return `This action returns all business` + dto;
    }

    findOne(dto: FindOneBusinessDto) {
        return `This action returns a #${dto} business`;
    }

    findOneBySlug(dto: FindOneBySLugBusinessDto) {
        return `This action returns a #${dto} business`;
    }

    update(dto: UpdateBusinessDto) {
        return `This action updates a #${dto} business`;
    }
}
