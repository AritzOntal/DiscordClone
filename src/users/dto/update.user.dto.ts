import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty({ message: '¡El nombre es obligatorio!'})
    @MinLength(3, { message: 'el nombre tiene que tener al menos 3 caracteres' })
    name: string;

    @IsEmail({}, { message: 'El email no tiene un formato válido'})
    @IsNotEmpty({ message: 'El email es obligatorio' })
    email: string;

}