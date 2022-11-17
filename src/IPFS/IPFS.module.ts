import { Module } from '@nestjs/common';

import { IPFSService } from './IPFS.service';

@Module({
  providers: [IPFSService],
  exports: [IPFSService],
})
export class IPFSModule {}
