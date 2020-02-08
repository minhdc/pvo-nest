import * as mongoose from "mongoose";

export type MongoId = string | number | mongoose.Types.ObjectId;

export enum EROLE{
    USER,
    ADMIN
}