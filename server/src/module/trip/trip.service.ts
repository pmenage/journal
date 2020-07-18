import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TripEntity } from './trip.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,
  ) {}

  findAll(): Promise<TripEntity[]> {
    return this.tripRepository.find();
  }

  findById(id: number): Promise<TripEntity> {
    return this.tripRepository.findOne({ id });
  }

  create(tripEntity: TripEntity): Promise<TripEntity> {
    return this.tripRepository.save(tripEntity);
  }

  async update(id: number, fileName: string): Promise<void> {
    const trip = await this.tripRepository.findOne(id);
    trip.coverImage = fileName;
    await this.tripRepository.save(trip);
  }
}
