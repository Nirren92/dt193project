import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ShelfModule } from './shelf/shelf.module';
import { ArticleinshelfModule } from './articleinshelf/articleinshelf.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ArticleModule,
    ShelfModule,
    ArticleinshelfModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
