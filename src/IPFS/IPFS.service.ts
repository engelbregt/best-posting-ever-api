import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { ApiPromise } from '@polkadot/api';
import { SubsocialApi } from '@subsocial/api';

import { ToFile } from 'ipfs-core-types/types/src/utils';
import { AddResult } from 'ipfs-core-types/types/src/root';

import { IPFSItemDto } from './dto/item.dto';

import { IPFS_AUTH_HEADER, IPFS_NODE_URL, SUBSTRATE_NODE_URL, AUTHORIZATION_HEADER_PREFIX } from 'utils/constants';

@Injectable()
export class IPFSService implements OnModuleInit {
  private authHeader: string;

  private substrateApi: ApiPromise;
  private subsocialApi: SubsocialApi;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.authHeader = await this.configService.get(IPFS_AUTH_HEADER);

    this.subsocialApi = await SubsocialApi.create({
      ipfsNodeUrl: IPFS_NODE_URL,
      substrateNodeUrl: SUBSTRATE_NODE_URL,
    });

    this.subsocialApi.ipfs.setWriteHeaders({
      authorization: AUTHORIZATION_HEADER_PREFIX + this.authHeader,
    });

    this.substrateApi = await this.subsocialApi.substrateApi;
  }

  async getCurrentBlockId(): Promise<string> {
    const blockStruct = await this.substrateApi.rpc.chain.getHeader();

    return blockStruct.number.toString();
  }

  addItems(items: IPFSItemDto[]): AsyncIterable<AddResult> {
    return this.subsocialApi.ipfs.client.addAll(
      items.map(({ name, content }) => {
        return { path: name, content: content };
      }) as ToFile[],
      { wrapWithDirectory: true },
    );
  }
}
