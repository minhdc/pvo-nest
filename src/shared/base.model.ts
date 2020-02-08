import { prop, buildSchema } from "@typegoose/typegoose";
import { Schema } from "mongoose";

export abstract class BaseModel {
    @prop()
    createdDate ?: Date;
    @prop()
    updatedDate ?: Date;

    id?: string;


    static get schema(): Schema{
        return buildSchema(this as any, {
            timestamps: true,
            toJSON:{
                getters: true,
                virtuals: true
            }
        })
    }

    static get modelName(): string {
        return this.name
    }
    
}