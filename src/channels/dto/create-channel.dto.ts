import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from "class-validator";


export class CreateChannelDto {

    @IsString()
        @IsNotEmpty({ message: 'El nombre para el servidor es oblligatorio' })
        @MinLength(3, { message: 'El nombre tiene que tener al menos 3 caracteres' })
        name: string;
    
        @IsString()
        @IsNotEmpty({ message: 'Tienes que tener una descripción' })
        type: string;
}
