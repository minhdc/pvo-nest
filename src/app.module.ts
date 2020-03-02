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
import { ConceptModule } from './concept/concept.module';
import { ExampleModule } from './example/example.module';
import { ConceptRelationModule } from './concept-relation/concept-relation.module';




@Module({
  imports: [ 
    AuthModule,
    ConfigModule.forRoot(),
    UsersModule,
    //MongooseModule.forRoot('mongodb+srv://extreme45nm:'+process.env.PASS_MONGO+'@pvo-cluster-0-ucjj2.gcp.mongodb.net/pvo?retryWrites=true&w=majority')],
    TypegooseModule.forRoot(process.env.MONGO_URI,{useNewUrlParser:true}),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ConceptModule,
    ExampleModule,
    ConceptRelationModule,    
    
  ],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
