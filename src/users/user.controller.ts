import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseDocumentOptionals } from 'mongoose';
import { MongoId } from 'src/config/constants';
import { User } from './user';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get("/profile")
  async getProfile(id: MongoId): Promise<User>{
    return await this.userService.getProfile(id);
  }
  
  

  
}
