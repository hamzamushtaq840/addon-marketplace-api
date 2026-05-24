import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateAddon {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;
}
