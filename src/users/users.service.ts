import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { UserModel } from './users.model';
import { User ,UserModel} from './user.model';
import {ReturnModelType} from "@typegoose/typegoose"
import { MongoId } from 'src/config/constants';
import { BaseService } from 'src/shared/base.service';

@Injectable()
export class UsersService extends BaseService<User> {
    
    constructor(@InjectModel(User.modelName) 
        private readonly userModel:ReturnModelType<typeof User>) {
        super(userModel)        
    }

    
}
