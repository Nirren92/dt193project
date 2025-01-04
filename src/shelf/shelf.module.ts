import { Module } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { ShelfController } from './shelf.controller';
import { Shelf, ShelfSchema } from './schema/shelf.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Shelf.name, schema: ShelfSchema }])],
  controllers: [ShelfController],
  providers: [ShelfService],
})
export class ShelfModule {}
