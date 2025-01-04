import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateArticleinshelfDto {
    @IsNumber()
    @IsNotEmpty()
    shelfID: number;
  
    @IsString()
    @IsNotEmpty()
    articlenumber: string;
  
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
  
    @IsNumber()
    @IsNotEmpty()
    level: number;
}
