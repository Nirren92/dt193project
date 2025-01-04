import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateArticleinshelfDto } from './dto/create-articleinshelf.dto';
import { UpdateArticleinshelfDto } from './dto/update-articleinshelf.dto';
import { ArticleInShelf } from './schema/articleinshelf.schema';

@Injectable()
export class ArticleinshelfService {
  constructor(@InjectModel(ArticleInShelf.name) private articleinshelfModel: Model<ArticleInShelf>) {}
    
  
  async create(createArticleinshelfDto: CreateArticleinshelfDto) {
    try
    {
      const createarticleinshelf = new this.articleinshelfModel(createArticleinshelfDto);
      return await createarticleinshelf.save();
    }
    catch(err)
    {
      throw new HttpException('Nåt gick fel: ' + err.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.articleinshelfModel.find().exec();
  }

  async findOne(id: string) {
    try
    {
      return await this.articleinshelfModel.findById(id).exec();
    }
    catch(err)
    {
      throw new HttpException('Nåt gick fel: ' + err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateArticleinshelfDto: UpdateArticleinshelfDto) {
    try
    {
      return await this.articleinshelfModel.findByIdAndUpdate({_id:id}, updateArticleinshelfDto).exec();
    }
    catch(err)
    {
      throw new HttpException('Nåt gick fel: ' + err.message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: string) {
    try
    {
      return this.articleinshelfModel.deleteOne({_id:id}).exec();
    }
    catch(err)
    {
      throw new HttpException('Nåt gick fel: ' + err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
