import { Module } from '@nestjs/common';
import { ConceptService } from './concept.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Concept } from './concept.model';
import { ConceptController } from './concept.controller';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Concept.modelName,schema:Concept.schema}
    ])
  ],
  controllers:[ConceptController],  
  providers: [ConceptService],
  exports:[ConceptService]

})
export class ConceptModule {}
