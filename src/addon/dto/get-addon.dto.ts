import { IsUUID } from 'class-validator';

export class GetAddonDto {
  @IsUUID('all')
  id: string;
}
