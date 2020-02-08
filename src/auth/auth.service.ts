import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {sign} from "jsonwebtoken"
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user';
export enum Provider {
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {
    private readonly JWT_SECRET = 'zzzzz'
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
            const id = googleProfile.id
            const tempUser:any = {
                googleId: googleProfile.id,                
                profile: {
                    name: {
                        firstName: googleProfile.givenName,
                        lastName: googleProfile.familyName
                    },
                    picture: googleProfile.photos[0].value
                }
            }
            this.userService.getProfileByGoogleId(googleProfile.id)
                .then(result => {
                    if(result !== null){
                        console.log('user exists')
                    }else{
                        console.log("creating user...")
                        this.userService.createUser(tempUser)
                        console.log('created user googleId : ',googleProfile.id)
                    }
                })
                .catch(err => {
                    console.log(err)
                }) 
            const payload = {
                id,
                provider
            }   
            
            const jwt:string = sign(payload,this.JWT_SECRET,{expiresIn: 36000})
            return jwt
        }catch(err){
            throw new InternalServerErrorException('validatedOAuthLogin',err.messages)
        }
    }
}
