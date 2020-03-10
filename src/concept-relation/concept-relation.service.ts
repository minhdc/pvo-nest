import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'src/shared/base.service';
import { ConceptRelation } from './concept-relation.model';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType, mongoose, Ref } from '@typegoose/typegoose';
import { Concept } from 'src/concept/concept.model';
import { MongoId } from 'src/config/constants';
import { realpathSync } from 'fs';

@Injectable()
export class ConceptRelationService extends BaseService<ConceptRelation>{
  constructor (@InjectModel(ConceptRelation.modelName)
  private readonly conceptRelation: ReturnModelType<typeof ConceptRelation>){
    super(conceptRelation)
  }

  async addConceptRelation(conceptRelation: ConceptRelation, userId: string): Promise<ConceptRelation>{
    let newConcept = {
      child: conceptRelation.child,
      parent:conceptRelation.parent,
      relation:conceptRelation.relation,
      createdBy: userId
    }

    try{
      let result = this.conceptRelation.create(newConcept)
      return result
    }catch(err){
      if(err.code === 11000){
        throw new HttpException({
          status:HttpStatus.PRECONDITION_FAILED,
          error:"Duplicated Concept Relation"
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

  

  async updateConceptRelationById(conceptRelationId: string, userId: string, conceptRelation:ConceptRelation): Promise<any>{
    try{
      let result = this.conceptRelation.updateOne({_id:conceptRelationId,createdBy:userId},conceptRelation)
      return result
    }catch(err){
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
          error:"Something is not right, please try again later"
      },400)
    }
  }

  async deleteConceptRelationById(conceptRelationId:string,userId:string):Promise<any>{
    try{
      let result = this.conceptRelation.deleteOne({_id:conceptRelationId})
      return result
    }catch(err){
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
          error:"Something is not right, please try again later"
      },400)
    }
  }

  async getChildList(conceptRelationId:string, userId: string):Promise<Ref<Concept,mongoose.Types.ObjectId>[]>{
    let result = await this.conceptRelation.find({parent:conceptRelationId,createdBy:userId}).populate('child')
    return result.map(each => {
      return each.child
    })
  }
  

  async getParentList(conceptRelationId:string, userId: string):Promise<Ref<Concept,mongoose.Types.ObjectId>[]>{
    let result = await this.conceptRelation.find({child:conceptRelationId,createdBy:userId}).populate('parent')
    return result.map(each => {
      return each.parent
    })
  }
  }