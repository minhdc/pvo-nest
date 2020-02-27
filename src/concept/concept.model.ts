import {prop,Typegoose, getModelForClass, Ref} from "@typegoose/typegoose"
import { BaseModel } from "src/shared/base.model";
import { User } from "src/users/user.model";

export class Concept extends BaseModel{

  @prop({
    unique: true,
    required:true,
    immutable:true,
    lowercase:true})
  conceptName: string;

  @prop({required:false})
  definition?: string;

  @prop({required:false})
  picURL?: string;

  @prop({
    ref:User,
    required:true,
    immutable:true})
  createdBy: Ref<User>;
}

export const ConceptModel = getModelForClass(Concept)