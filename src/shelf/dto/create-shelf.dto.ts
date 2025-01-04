import { IsNotEmpty, IsNumber, Min } from "class-validator";


export class CreateShelfDto {
   

    @IsNumber()
    @Min(0, { message: 'måste vara större än 0' })
    @IsNotEmpty()
    readonly binvolume: number;
}
