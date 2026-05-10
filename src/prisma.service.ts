import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';

//Para poder inyectarlo al arrancar el modulo
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect()
    }
}