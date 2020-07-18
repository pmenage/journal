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
import { diskStorage } from 'multer';

import { TripService } from './trip.service';
import { TripEntity } from './trip.entity';

import {
  editRequestFileName,
  editFileName,
} from '../../utils/file-upload.utils';

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

  @Post(':id/coverImage/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
        filename: editRequestFileName,
      }),
    }),
  )
  uploadCoverImage(@UploadedFile() file, @Param() id: number): Promise<void> {
    console.log(file);
    return this.tripService.update(id, editFileName(file));
  }
}
