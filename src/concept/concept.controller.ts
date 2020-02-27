import { Controller, Get, UseGuards, Res, Req, Post, HttpStatus, HttpException, Put, Patch, Delete } from '@nestjs/common';
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
      return res.status(HttpStatus.CREATED).json(newConcept)
    }else{
      // return res.status(HttpStatus.SERVICE_UNAVAILABLE).json("add concept fail")
      throw new HttpException({
        status:HttpStatus.INTERNAL_SERVER_ERROR,
          error:"Something is not right, please try again later"
      },500)
    }
  }

  @Patch("/")
  @UseGuards(AuthGuard("jwt"))
  async updateConcept(@Req() req, @Res() res):Promise<Concept>{
    let newConcept = await this.conceptServices.updateConceptById(req.body._id,req.user.result.id,req.body)
    console.log("updated: ",newConcept)
    if(newConcept.id){      
      return res.status(HttpStatus.OK).json(newConcept)
    }else{      
      throw new HttpException({
        status:HttpStatus.INTERNAL_SERVER_ERROR,
          error:"Something is not right, please try again later"
      },500)
    }
  }

  @Delete("/")
  @UseGuards(AuthGuard("jwt"))
  async deleteConcept(@Req() req, @Res() res):Promise<Concept>{
    console.log("current user: ",req.user.result.id)
    let deletedConcept = await this.conceptServices.deleteConceptById(req.body.id,req.user.result.id)
    console.log("deleted: ",deletedConcept)
    if(deletedConcept){      
      return res.status(HttpStatus.OK).json({deleted: deletedConcept})
    }else{      
      throw new HttpException({
        status:HttpStatus.INTERNAL_SERVER_ERROR,
          error:"Something is not right, please try again later"
      },500)
    }
  }
  

  


}
