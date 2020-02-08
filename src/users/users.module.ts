import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

// import {UserSchema, UserModel} from "./users.model";

import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user';


@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService]
  
})
export class UsersModule {}
