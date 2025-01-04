import { PartialType } from '@nestjs/mapped-types';
import { CreateShelfDto } from './create-shelf.dto';
import { IsNotEmpty, IsNumber, Min } from "class-validator";


export class UpdateShelfDto extends PartialType(CreateShelfDto) {
        @IsNumber()
        @IsNotEmpty()
        readonly shelfID: number;
    
        @IsNumber()
        @Min(0, { message: 'måste vara större än 0' })
        @IsNotEmpty()
        readonly binvolume: number;
}
