import { Controller, Get, UseGuards, Res, Req, Post } from '@nestjs/common';
import { ConceptService } from './concept.service';
import { AuthGuard } from '@nestjs/passport';
import { Concept } from './concept.model';

@Controller('concepts')
export class ConceptController {

  constructor(private readonly conceptServices: ConceptService){}

  @Get("/list")
  @UseGuards(AuthGuard("jwt"))
  async getListConcept(@Req() req,@Res() res):Promise<Concept[]>{

    return res.json(await this.conceptServices.findAll({createdBy:req.user.result.id}))
  }

  @Post("/")
  @UseGuards(AuthGuard("jwt"))
  async addConcept(@Req() req, @Res() res):Promise<Concept>{
    let newConcept = await this.conceptServices.addConcept(req.body,req.user.result)
    if(newConcept.id){
      return res.json(newConcept)
    }else{
      return res.json("add concept fail")
    }
  }

}
