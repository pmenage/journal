import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'trip',
})
export class TripEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  coverImage: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  country: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;
}
