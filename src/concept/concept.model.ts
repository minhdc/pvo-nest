import {prop,Typegoose, getModelForClass, Ref} from "@typegoose/typegoose"
import { BaseModel } from "src/shared/base.model";
import { User } from "src/users/user.model";

export class Concept extends BaseModel{

  @prop({unique: true,
  validate: {
    validator: (v) => {
      return v.unique
    },
    message: "Duplicated Concept"
  }})
  conceptName: string;

  @prop()
  definition?: string;

  @prop()
  picURL?: string;

  @prop({ref:User})
  createdBy: Ref<User>;
}

export const ConceptModel = getModelForClass(Concept)