import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsNumber } from "class-validator";


export class CreateServerDto {

    @IsString()
    @IsNotEmpty({ message: 'El nombre para el servidor es oblligatorio' })
    @MinLength(3, { message: 'El nombre tiene que tener al menos 3 caracteres' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Tienes que tener una descripción' })
    description: string;

    @IsNotEmpty()
    members: number[]

}
