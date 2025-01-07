import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ArticleinshelfService } from './articleinshelf.service';
import { CreateArticleinshelfDto } from './dto/create-articleinshelf.dto';
import { UpdateArticleinshelfDto } from './dto/update-articleinshelf.dto';
import path from 'path';

@Controller('articleinshelf')
export class ArticleinshelfController {
  constructor(private readonly articleinshelfService: ArticleinshelfService) {}

  @Post()
  create(@Body() createArticleinshelfDto: CreateArticleinshelfDto) {
    return this.articleinshelfService.create(createArticleinshelfDto);
  }

  @Get()
  findAll() {
    return this.articleinshelfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleinshelfService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArticleinshelfDto: UpdateArticleinshelfDto) {
    return this.articleinshelfService.update(id, updateArticleinshelfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleinshelfService.remove(id);
  }
}
