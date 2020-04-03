import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BlockEntity } from './block.entity';

@Injectable()
export class BlockService {
    constructor(
        @InjectRepository(BlockEntity) private blockRepository: Repository<BlockEntity>
    ) { }

    findAll(): Promise<BlockEntity[]> {
        return this.blockRepository.find();
    }

    create(blockEntity: BlockEntity): Promise<BlockEntity> {
        return this.blockRepository.save(blockEntity);
    }
}
