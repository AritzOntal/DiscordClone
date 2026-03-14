import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create.user.dto';

//Es inyectable en el constructor del usersController
@Injectable()
export class UsersService {

    private users: User[];

    //Buscar todos lo usuarios
    getUsers(): User[] {
        return this.users;
    }

    getUser(id: number): User {
        return this.users[id]
    }

    //Crear usuario
    create(user: CreateUserDto): User {
        const newId = this.users.length + 1;
        const newUser = new User(newId, user.name, user.email);

        this.users.push(newUser);
        return newUser;
    }

    modify(id: number, name: string, email: string): User {

        const user = this.getUser(id);

        if (!user) {
            throw new NotFoundException(`El usuario con el id ${id} no existe`);
        }

        user.name = name;
        user.email = email;

        return user;
    }


    remove(id: number): void {
        // Esto crea una nueva lista de filtrada por todos los que no tenga este ID (es mas seguro porque crea una nueva copia)
        this.users = this.users.filter(user => user.id !== id);
    }
}
