import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateAddonDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;
}
