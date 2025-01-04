import { Module } from '@nestjs/common';
import { ArticleinshelfService } from './articleinshelf.service';
import { ArticleinshelfController } from './articleinshelf.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleInShelfSchema } from './schema/articleinshelf.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ArticleInShelf', schema: ArticleInShelfSchema }])],
  controllers: [ArticleinshelfController],
  providers: [ArticleinshelfService],
})
export class ArticleinshelfModule {}
