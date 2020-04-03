import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { BlockEntity } from './block.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BlockEntity])],
    controllers: [BlockController],
    providers: [BlockService],
})
export class BlockModule { }
