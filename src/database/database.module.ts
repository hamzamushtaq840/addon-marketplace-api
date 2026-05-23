import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    // .env file gets read
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      // We now have permission to look inside the ConfigModule box
      imports: [ConfigModule],
      // (Because ConfigModule might have 3 different internal helper tools, we must specify!)
      inject: [ConfigService],
      //   The worker arrives at your function.
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
