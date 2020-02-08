import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getShit(): string{
    return this.appService.getShit();
  }
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
}
