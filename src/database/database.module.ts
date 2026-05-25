import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        retryAttempts: 10, // Try 10 times instead of the default 5
        retryDelay: 5000, // Wait 5 seconds between tries instead of 3
        keepConnectionAlive: true, // Tell NestJS not to kill the socket on watch-mode reloads
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
