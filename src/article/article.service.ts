import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schema/article.schema';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  async create(createArticleDto: CreateArticleDto):Promise<Article> {
    try
    {
      
      //kontoll att inte artikelnummer redan finns
      const checkArticleExist = await this.articleModel.findOne({articlenumber: createArticleDto.articlenumber});
      if(checkArticleExist)
      {
        throw new HttpException('Artikelnummer finns redan', HttpStatus.BAD_REQUEST);
      }
      //artikelnummer finns inte. skapar en ny
      const createarticle = new this.articleModel(createArticleDto);
      return createarticle.save();
    }
    catch(err)
    {
      return err;
    }
  }

  //retunerar alla objekt
  async findAll():Promise<Article[]> {
    return this.articleModel.find().exec();    
  }

  //hämtar data för en specifik artikel 
  async findOne(id: string):Promise<Article> {
    try
    {  

      return this.articleModel.findOne({articlenumber:id}).exec();
    }
    catch(err)
    {
      return err
    }
  
  }

  //uppdaterar befintlig artikel. kontrollerar om artikelnummer ska bytas och ska den de så kontrolleras att den nya inte redan finns. 
  async update(id: string, updateArticleDto: UpdateArticleDto):Promise<Article>  {
    //kontrollerar om artikelnummer ska uppdateras på beröd artikel
    try
    {  
      //kontrollerar att det är ett korrekt mongodbid
      if (!Types.ObjectId.isValid(id)) 
      {
        throw new HttpException('ingen korrekt mongodb _id', HttpStatus.BAD_REQUEST);
      }
      //kontrollerar inte artikellnummer redan finns ifall det ska bytas. 
      if(updateArticleDto.articlenumber)
      {
        const existingFiskDrag = await this.articleModel.findOne({artikelnummer:updateArticleDto.articlenumber, _id:{$ne:id}}).exec();
        if (existingFiskDrag) 
          {
            throw new HttpException(
              `artikelnummmer är redan använt`,
              HttpStatus.BAD_REQUEST,
            );
          }
      
      }

      const updateFiskdrag = await this.articleModel.findByIdAndUpdate({_id:id},updateArticleDto,{new:true}).exec();
      if(!updateFiskdrag)
      {
        throw new HttpException('id finns inte', HttpStatus.BAD_REQUEST);
      }
      return updateFiskdrag;
    }
    catch(err)
    {
      return err
    }
    
  }


  //raderar valt id
 async remove(id: string):Promise<Article> {
  try
  {  
    //kontrollerar att det är ett korrekt mongodbid
      const deleteFiskdrag = await this.articleModel.findOneAndDelete({articlenumber:id }).exec();
      if(!deleteFiskdrag)
      {
        throw new HttpException('id finns inte',HttpStatus.BAD_REQUEST);
      }
      return deleteFiskdrag;
    }
    catch(err)  
    {
      return err
    }
  }
}

