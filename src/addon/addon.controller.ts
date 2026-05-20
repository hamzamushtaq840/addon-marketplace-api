import { Controller } from '@nestjs/common';
import { AddonService } from './addon.service';

@Controller('addon')
export class AddonController {
  constructor(private readonly addonService: AddonService) {}
}
