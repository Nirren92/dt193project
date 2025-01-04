import { IsString, IsOptional, IsNumber, Length, Min, IsNotEmpty,  IsBoolean, isNumber } from 'class-validator';

export class CreateArticleDto {
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
