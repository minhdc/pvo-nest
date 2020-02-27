import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Concept } from './concept.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ConceptService extends BaseService<Concept> {
  constructor(@InjectModel(Concept.modelName)
  private readonly conceptModel: ReturnModelType<typeof Concept>){
    super(conceptModel)
  }

  async addConcept(concept: Concept,userId: string):Promise<Concept>{
    let newConcept = {
      conceptName: concept.conceptName,
      definition: concept.definition,
      picURL: concept.picURL,
      createdBy: userId
   }

  //  try{

  //  }catch(err){

  //  }
    return await this.conceptModel.create(newConcept)
  }

}
