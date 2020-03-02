import * as mongoose from "mongoose";

export type MongoId = string | number | mongoose.Types.ObjectId;

export enum EROLE{
    USER,
    ADMIN
}

export enum EXAMPLE_CONCEPT_RELATION{
    SAME_CONCEPT_AND_SUB_CONCEPT,
    RELATED_CONCEPT,
    DOER_OF_ACTION,
    RECEIVER_OF_ACTION,
    ACTION,
    BEING_DESCRIBED_BY,
    DESCRIBING,
    IDIOM_AND_FIXED_EXPRESSION,
    RELATED_PHRASES    
}

export enum CONCEPT_CONCEPT_RELATION {
    GENERAL_ASSOCICATION,
    OF_THE_SAME_CONCEPT_CLUSTER,
    A_PART_OF,
    A_TYPE_OF,
    DESCRIBING,
    
}