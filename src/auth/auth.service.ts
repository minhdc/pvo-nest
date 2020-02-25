import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {sign} from "jsonwebtoken"
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.model';
import { MongoId, EROLE } from 'src/config/constants';
export enum Provider {
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET
    // private readonly userService
    constructor(private readonly userService: UsersService){
        this.userService = userService
    }

    async validateOAuthLogin(googleProfile: any, provider: Provider):Promise<string>{
        try{
            //may ned some registration logic here if google ID is not present in DB
            console.log("at auth service")
            console.log("creating user if not exists")
            console.log(googleProfile)   

            const tempUser:any = {
                googleId: googleProfile.id,                
                profile: {
                    name: {
                        firstName: googleProfile.name.givenName,
                        lastName: googleProfile.name.familyName
                    },
                    picture: googleProfile.photos[0].value,
                    role:EROLE.USER
                }
            }            

            return this.userService.findOneAsync({googleId:tempUser.googleId})
                .then(result => {
                    
                    if(result){
                        console.log('user found')
                        console.log('hello, ',result.profile.name.firstName)
                        const payload = {
                            result,                            
                        }                       
                        const jwt:string = sign(payload,this.JWT_SECRET,{expiresIn: 36000})
                        return jwt
                    }else{
                        console.log("creating user....new")
                        const r = this.userService.create(tempUser)
                        const payload = {
                            r,                            
                        }                       
                        const jwt:string = sign(payload,this.JWT_SECRET,{expiresIn: 36000})
                        return jwt
                    }
                })
                .catch(err => {
                    console.log(err)
                    throw new InternalServerErrorException('validatedOAuthLogin',err.messages)
                })            
            
           
        }catch(err){
            throw new InternalServerErrorException('validatedOAuthLogin',err.messages)
        }
    }
}
