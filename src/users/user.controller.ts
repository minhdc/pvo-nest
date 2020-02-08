import { Controller, Get, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseDocumentOptionals } from 'mongoose';
import { MongoId } from 'src/config/constants';
import { User } from './user.model';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get("/profile")
  async getProfile(@Req() req, @Res() res): Promise<User>{
    console.log(req)
    return await this.userService.findById(req.user.id);
  }
  
  

  
} 
