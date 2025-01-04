import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class UpdateArticleDto extends PartialType(CreateArticleDto) 
{
        @IsString()
        @Length(5, 5, { message: 'artikelnummer måste vara 5 tecken.' })
        readonly articlenumber: string;
    
        @IsString()
        @IsNotEmpty()
        readonly name: string;
    
        @IsNumber()
        @IsNotEmpty()
        @Min(0, { message: 'Priset måste vara större än 0.' })
        readonly price: number;
    
        @IsString()
        @IsNotEmpty()
        readonly description: string;
}
