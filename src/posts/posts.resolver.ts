import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { PostModel } from './models/post.model';

import { PostDto } from './dto/post.dto';

import { PostsService } from './posts.service';

import { POST_MUTATION_FIELD } from 'utils/constants';

@Resolver(() => PostModel)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [PostModel])
  findAll(): Promise<PostModel[]> {
    return this.postsService.findAll();
  }

  @Mutation(() => PostModel)
  create(@Args(POST_MUTATION_FIELD) postDto: PostDto): Promise<PostModel> {
    return this.postsService.create(postDto);
  }
}
