import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/common/role.enum';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { AddonService } from './addon.service';
import { CreateAddonDto } from './dto/create-addon.dto';

@Controller('addons')
export class AddonController {
  constructor(private readonly addonService: AddonService) {}

  @Get()
  findAll() {
    return this.addonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.addonService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createAddonDto: CreateAddonDto) {
    return this.addonService.create(createAddonDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.addonService.remove(id);
  }
}
