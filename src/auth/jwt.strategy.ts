import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import {ExtractJwt, Strategy} from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(/**autheSErvice as param */){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'zzzzz'
        })
    }

    async validate(payload: any,done: Function){
        try{
            //assigning roles
            console.log("assigning role....")
            //console.log(payload)
            done(null,payload)
        }catch(err){
            throw new UnauthorizedException('unauthorized',err.message);
        }
    }
}