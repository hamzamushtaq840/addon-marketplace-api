import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddonController } from './addon.controller';
import { AddonService } from './addon.service';
import { Addon } from './entity/addon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Addon])],
  controllers: [AddonController],
  providers: [AddonService],
})
export class AddonModule {}
