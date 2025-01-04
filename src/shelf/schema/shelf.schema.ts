import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShelfDocument = HydratedDocument<Shelf>;

@Schema()
export class Shelf {

  @Prop({ required: true, unique: true })
  shelfID: number;

  @Prop({ required: true })
  binvolume: number;
 
}

export const ShelfSchema = SchemaFactory.createForClass(Shelf);
