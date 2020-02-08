import { Injectable, Module } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService ,Provider } from "./auth.service";

@Module({
    imports:[ConfigModule]
})

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    
    // protected configService: ConfigService;
    constructor(
        private readonly authService: AuthService,
        private readonly configService:ConfigService
    ){  
        super({
            // clientID: '81620151486-81tn6ul0h5trm5p3oistubensubbfa6e.apps.googleusercontent.com',
            // clientSecret:'xRk6yUx9XDlfrySYvIxSVgKO',
            clientID: configService.get<string>('GOOGLE_CLIENT'),
            clientSecret: configService.get<string>('GOOGLE_SECRET'),
            callbackURL: 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile']
        })
        
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile:any, done: Function) {
        try {            
            console.log("at google.strategy.....")
            // check for user existence, then do sth later....
            
            const jwt: string = await this.authService.validateOAuthLogin(profile,Provider.GOOGLE)
            const user =
            {
                jwt
            }

            done(null, user);
        }
        catch (err) {
            // console.log(err)
            done(err, false);
        }
    }
}