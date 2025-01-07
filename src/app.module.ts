import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ShelfModule } from './shelf/shelf.module';
import { ArticleinshelfModule } from './articleinshelf/articleinshelf.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ArticleModule,
    ShelfModule,
    ArticleinshelfModule,
    AuthModule,
    UsersModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
