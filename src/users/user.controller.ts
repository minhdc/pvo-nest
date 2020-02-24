import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseDocumentOptionals } from 'mongoose';
import { MongoId } from 'src/config/constants';
import { User } from './user.model';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get("/profile")
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req, @Res() res): Promise<User>{
    console.log("shittttttttttttttttttttt")
    console.log("user: ",req.user.result._id)
    console.log("useriddddddddd:",req.user.result._id)
    return res.json(await this.userService.findById(req.user.result._id));
  }
  
  

  
} 
