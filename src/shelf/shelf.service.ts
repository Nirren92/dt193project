import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Shelf } from './schema/shelf.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ShelfService {
  constructor(@InjectModel(Shelf.name) private shelfModel: Model<Shelf>) {}

  async create(createShelfDto: CreateShelfDto) {
    try
    {
      const createShelf = await this.shelfModel.create(createShelfDto);
      return await createShelf.save();
    }
    catch(err)
    {
      throw new HttpException('Nåt gick fel: ' + err.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.shelfModel.find().exec();
  }

  async findOne(id: string) {
    try
    {
      return await this.shelfModel.findById(id).exec();
    }
    catch(err)
    {
      throw new HttpException('Nåt gick fel: ' + err.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: string, updateShelfDto: UpdateShelfDto) {
    try
    {
      return this.shelfModel.findByIdAndUpdate(id, updateShelfDto, {new: true}).exec();
    }
    catch(err)
    {
      throw new HttpException('Nåt gick fel: ' + err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try
    {           
      return await this.shelfModel.findByIdAndDelete(id).exec();
    }
    catch(err)
    {
      throw new HttpException('Nåt gick fel: ' + err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
