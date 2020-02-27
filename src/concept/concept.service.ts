import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
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

   try{
    let result = await this.conceptModel.create(newConcept)
    return result
   }catch(err){
      if(err.code === 11000){
        throw new HttpException({
          status:HttpStatus.PRECONDITION_FAILED,
          error:"Duplicated concept"
        },412)
      }else{
        console.log(err)
        throw new HttpException({
          status:HttpStatus.BAD_REQUEST,
          error:"Something is not right, please try again later"
        },400)
      }
    }
   
  }

  async deleteConceptById(conceptId: string, userId: string):Promise<any>{
    try{
      let result = await this.conceptModel.deleteOne({_id:conceptId,createdBy:userId})
      return result.deletedCount
    }catch(err){
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
          error:"Something is not right, please try again later"
      },400)
    }
  }

  async updateConceptById(conceptId: string, userId: string,concept: Concept):Promise<Concept>{
    try{
      let result = await this.conceptModel.updateOne({_id:conceptId,createdBy:userId},concept)
      return result.deletedCount
    }catch(err){
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
          error:"Something is not right, please try again later"
      },400)
    }
  }

}
