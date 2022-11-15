import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostEntity } from '../database/entities/post.entity';

import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async findAll(): Promise<PostEntity[]> {
    try {
      return this.postRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async create(postDto: PostDto): Promise<PostEntity | null> {
    try {
      const { spaceId, ownerId, content } = postDto;
      const { body, tags, image, title } = content;

      const post = this.postRepository.create({ ownerId, spaceId, body, tags, image, title });

      const result = await this.postRepository.save(post);

      if (!result) return null;

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
