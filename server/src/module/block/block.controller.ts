import { Controller, Get, Post, Body } from '@nestjs/common';

import { BlockService } from './block.service';
import { BlockEntity } from './block.entity';

@Controller('/block')
export class BlockController {
    constructor(private readonly blockService: BlockService) { }

    @Get()
    getBlock(): Promise<BlockEntity[]> {
        return this.blockService.findAll();
    }

    @Post()
    createBlock(@Body() blockEntity: BlockEntity): Promise<BlockEntity> {
        return this.blockService.create(blockEntity);
    }

}
