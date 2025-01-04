import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleinshelfDto } from './create-articleinshelf.dto';

export class UpdateArticleinshelfDto extends PartialType(CreateArticleinshelfDto) {}
