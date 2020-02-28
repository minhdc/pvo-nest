import {prop,Typegoose, getModelForClass, Ref, index} from "@typegoose/typegoose"
import { BaseModel } from "src/shared/base.model";
import { Concept } from "src/concept/concept.model";
import { EXAMPLE_CONCEPT_RELATION } from "src/config/constants";
import { User } from "src/users/user.model";
import { IModelOptions } from "@typegoose/typegoose/lib/types";

@index({fields:{exampleContent:1,relation:1,linkedConcept:1,createdBy:1},options:{unique:true}})
export class Example extends BaseModel{

    @prop({required:true})
    exampleContent: string;

    @prop({enum:EXAMPLE_CONCEPT_RELATION,required:true})
    relation: Number;

    @prop({ref:Concept,required:true})
    linkedConcept: Ref<Concept>[];

    @prop()
    keywords: string[];

    @prop()
    source: string
    @prop({ref:User})
    createdBy: Ref<User>;
    
}
// const options:IModelOptions = {
//     options:[]
// }
export const ExampleModel = getModelForClass(Example)