import { CreateAddon } from './create-addon.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAddon extends PartialType(CreateAddon) {}
