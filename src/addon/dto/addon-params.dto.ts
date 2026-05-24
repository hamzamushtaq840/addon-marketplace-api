import { IsUUID } from 'class-validator';

export class AddonParamsDto {
  @IsUUID('all')
  id: string;
}
