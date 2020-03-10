import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { BaseService } from 'src/shared/base.service';
import { Example } from './example.model';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ExampleService extends BaseService<Example>{
  constructor(@InjectModel(Example.modelName)
    private readonly exampleModel: ReturnModelType<typeof Example>){
      super(exampleModel)
    }

  async addExample(example: Example,userId: string): Promise<Example>{
    let newExample = {
      exampleContent: example.exampleContent,
      relation: example.relation,
      linkedConcept: example.linkedConcept,
      createdBy: userId,
      keywords: example.keywords,
      source: example.source
    }

    try{
      let result = await this.exampleModel.create(newExample)
      return result
    }catch(err){
      if(err.code === 11000){
        throw new HttpException({
          status:HttpStatus.PRECONDITION_FAILED,
          error:"Duplicated Example"
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

  async updateExampleById(exampleId: string, userId: string,example: Example):Promise<any>{
    try{
      let result = await this.exampleModel.updateOne({_id:exampleId,createdBy:userId},example)
      return result
    }catch(err){
      console.log(err)
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
          error:"Something is not right, please try again later"
      },400)
    }
  }

  async deleteExampleById(exampleId: string, userId: string):Promise<any>{
    try{
      let result = await this.exampleModel.deleteOne({_id:exampleId,createdBy:userId})
      return result.deletedCount
    }catch(err){
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
          error:"Something is not right, please try again later"
      },400)
    }
  }
  
}
