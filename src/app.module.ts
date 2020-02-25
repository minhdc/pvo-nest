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
import { ExamplesModule } from './nest/examples/examples.module';
import { ExamplesController } from './examples/examples.controller';
import { ExamplesService } from './examples/examples.service';
import { ConceptsModule } from './nest/concepts/concepts.module';
import { ConceptsController } from './concepts/concepts.controller';
import { ConceptsService } from './concepts/concepts.service';
import { ConceptRelationsModule } from './nest/concept-relations/concept-relations.module';
import { ConceptRelationsController } from './concept-relations/concept-relations.controller';
import { ConceptRelationsService } from './concept-relations/concept-relations.service';


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
    ExamplesModule,
    ConceptsModule,
    ConceptRelationsModule,
  ],
  controllers: [AppController, ExamplesController, ConceptsController, ConceptRelationsController],
  providers: [AppService, ExamplesService, ConceptsService, ConceptRelationsService],
})
export class AppModule {}
