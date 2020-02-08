import {prop,Typegoose, getModelForClass} from "@typegoose/typegoose"

export class User extends Typegoose {
    @prop()
    email?: string;
    @prop()
    password?: string;
    @prop()
    passwordResetToken?: string;
    @prop()
    passwordResetExpires?: Date;
    
    @prop()
    facebookId?: string;
    @prop()
    googleId?: string;
    // tokens?: AuthToken[];
  
    @prop()
    profile?: {
      name?: {
        firstName?: string;
        lastName?: string;
      }
      gender?: string;
      location?: string;
      website?: string;
      picture?: string;
    };
    @prop()
    role?: number;
    @prop()
    iat?: object;

    // comparePassword?: comparePasswordFunction;
    // gravatar?: (size?: number) => string;;
}

export const UserModel = getModelForClass(User);
