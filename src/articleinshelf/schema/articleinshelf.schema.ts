import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Article } from 'src/article/schema/article.schema';
import { Shelf } from 'src/shelf/schema/shelf.schema';



export type ArticleInShelfDocument = HydratedDocument<ArticleInShelf>;

@Schema()
export class ArticleInShelf {

  @Prop({ type: Number, ref: Shelf.name, required: true })
  shelfID: number;

  @Prop({ required: true, ref: Article.name, type: String })
  articlenumber: string;

  @Prop({ required: true, type: Number})
  quantity: number;

  @Prop({ required: true, type: Number})
  level: number;
}

export const ArticleInShelfSchema = SchemaFactory.createForClass(ArticleInShelf);
ArticleInShelfSchema.index({ shelfID: 1, level: 1 }, { unique: true });


ArticleInShelfSchema.pre('save', async function (next) {
  try
  {
    const shelfModel = this.model('Shelf');
    const articleModel = this.model('Article');

    const shelfExist = await shelfModel.findOne({shelfID: this.shelfID});
    if (!shelfExist)
    {
      throw new Error('Hyllan finns inte');
    }

    const articleExist = await articleModel.findOne({ articlenumber: this.articlenumber });
    if (!articleExist) 
    {
      throw new Error('article finns inte');
    }
    next();
  }
  catch(err)
  {
    next(err);
  }
});