import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findOne(id: string) {
    const addon = await this.addonRep.findOne({ where: { id } });
    if (!addon) throw new NotFoundException(`Addon with ID ${id} not found`);
    return addon;
  }

  create(createAddonDto: CreateAddonDto): Promise<Addon> {
    return this.addonRep.save(createAddonDto);
  }

  async remove(id: string) {
    const result = await this.addonRep.delete({ id });
    if (result.affected === 0)
      throw new NotFoundException(`Addon with ID ${id} not found`);
    return result;
  }
}
