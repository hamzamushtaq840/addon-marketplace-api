import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddonParamsDto } from './dto/addon-params.dto';
import { CreateAddonDto } from './dto/create-addon.dto';
import { Addon } from './entity/addon.entity';

@Injectable()
export class AddonService {
  constructor(
    @InjectRepository(Addon)
    private addonRep: Repository<Addon>,
  ) {}

  findAll() {
    return this.addonRep.find();
  }

  findOne(params: AddonParamsDto) {
    return this.addonRep.findOne({ where: { id: params.id } });
  }

  create(createAddonDto: CreateAddonDto): Promise<Addon> {
    return this.addonRep.save(createAddonDto);
  }

  remove(params: AddonParamsDto) {
    return this.addonRep.delete({ id: params.id });
  }
}
