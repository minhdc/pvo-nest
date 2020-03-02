import {prop,Typegoose, getModelForClass, Ref, index} from "@typegoose/typegoose"
import { BaseModel } from "src/shared/base.model";
import { Concept } from "src/concept/concept.model";
import { CONCEPT_CONCEPT_RELATION } from "src/config/constants";
import { User } from "src/users/user.model";

@index({parent:1,child:1,relation:1,createdBy:1},{unique:true})
export class ConceptRelation extends BaseModel{
  @prop({ref:Concept,required:true})
  child : Ref<Concept>;


  @prop({ref:Concept,required:true})
  parent : Ref<Concept>;


  @prop({enum:CONCEPT_CONCEPT_RELATION,required:true})
  relation : Number;

  
  @prop({ref:User})
  createdBy: Ref<User>
}