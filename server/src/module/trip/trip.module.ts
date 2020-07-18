import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TripEntity } from './trip.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([TripEntity]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
