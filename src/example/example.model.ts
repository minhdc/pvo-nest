import {prop,Typegoose, getModelForClass, Ref} from "@typegoose/typegoose"
import { BaseModel } from "src/shared/base.model";
import { Concept } from "src/concept/concept.model";
import { EXAMPLE_CONCEPT_RELATION } from "src/config/constants";


export class Example extends BaseModel{

    @prop({required:true})
    exampleContent: string;

    @prop({enum:EXAMPLE_CONCEPT_RELATION,required:true})
    relation: Number;

    @prop({ref:Concept,required:true})
    linkedConcept: Ref<Concept>;

    @prop()
    keywords: string[];

    @prop()
    source: string
}

export const ExampleModel = getModelForClass(Example)