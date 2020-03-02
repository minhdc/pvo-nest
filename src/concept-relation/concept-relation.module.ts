import { Module } from '@nestjs/common';
import { ConceptRelationController } from './concept-relation.controller';
import { ConceptRelationService } from './concept-relation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Concept } from 'src/concept/concept.model';
import { ConceptRelation } from './concept-relation.model';

@Module({
  imports : [
    MongooseModule.forFeature([
      {name: ConceptRelation.modelName, schema:ConceptRelation.schema}
    ])
  ],
  controllers: [ConceptRelationController],
  providers: [ConceptRelationService],
  exports: [ConceptRelationService]
})
export class ConceptRelationModule {}
