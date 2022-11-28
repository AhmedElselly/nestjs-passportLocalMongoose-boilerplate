import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from 'src/middlewares/isAuth.middleware';
import { PostSchema } from 'src/schemas/post.schema';
import { UserController } from 'src/user/user.controller';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'Post',
      schema: PostSchema
    }
  ])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule{}

// export class PostModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware)
//     .exclude(
//       {path: 'posts', method: RequestMethod.GET},
//       // {path: 'posts/:postId', method: RequestMethod.GET},
//     ).forRoutes(PostController)
//   }  
// }