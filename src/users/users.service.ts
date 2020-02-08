import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
// import { UserModel } from './users.model';
import { User } from './user';
import {ReturnModelType} from "@typegoose/typegoose"
import { MongoId } from 'src/config/constants';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {
    }

    async createUser(user: User){
        const createdUser  = new this.userModel(user)
        return await createdUser.save()
    }

    async getProfile(id:MongoId): Promise<User>{
        return await this.userModel.findById(id);
    }

    async getProfileByGoogleId(googleId: string): Promise<User>{
        return await this.userModel.findOne({googleId:googleId});
    }
}
