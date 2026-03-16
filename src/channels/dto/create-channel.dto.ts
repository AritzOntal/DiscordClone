import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsNumber } from "class-validator";


export class CreateChannelDto {

    @IsString()
    @IsNotEmpty({ message: 'El nombre para el canal es oblligatorio' })
    @MinLength(3, { message: 'El nombre tiene que tener al menos 3 caracteres' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Tienes que aginar un tipo' })
    type: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Tienes que aginarlo a un servidor' })
    serverId: number

}
