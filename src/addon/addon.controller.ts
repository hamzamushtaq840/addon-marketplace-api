import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddonService } from './addon.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { GetAddonDto } from './dto/get-addon.dto';

@Controller('addons')
export class AddonController {
  constructor(private readonly addonService: AddonService) {}

  @Get()
  findAll() {
    return this.addonService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: GetAddonDto) {
    return this.addonService.findOne(params);
  }

  @Post()
  create(@Body() createAddonDto: CreateAddonDto) {
    return this.addonService.create(createAddonDto);
  }

  @Delete(':id')
  remove(@Param() params: GetAddonDto) {
    return this.addonService.remove(params);
  }
}
