import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserController} from "./users/user.controller"
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersService } from './users/users.service';

@Module({
  imports: [ 
    AuthModule,
    ConfigModule.forRoot(),
    UsersModule,
    //MongooseModule.forRoot('mongodb+srv://extreme45nm:'+process.env.PASS_MONGO+'@pvo-cluster-0-ucjj2.gcp.mongodb.net/pvo?retryWrites=true&w=majority')],
    TypegooseModule.forRoot(process.env.MONGO_URI,{useNewUrlParser:true}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
