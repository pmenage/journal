import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { TripService } from './trip.service';
import { TripEntity } from './trip.entity';

@Controller('/trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  getTrip(): Promise<TripEntity[]> {
    return this.tripService.findAll();
  }

  @Get(':id')
  getTripById(@Param() id: number): Promise<TripEntity> {
    return this.tripService.findById(id);
  }

  @Post()
  createTrip(@Body() tripEntity: TripEntity): Promise<TripEntity> {
    return this.tripService.create(tripEntity);
  }

  @Post('coverImage/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadCoverImage(@UploadedFile() file) {
    console.log(file);
  }
}
