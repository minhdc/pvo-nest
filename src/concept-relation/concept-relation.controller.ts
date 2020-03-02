import { Controller, Get, UseGuards, Req, Res, Post, HttpStatus, HttpException, Patch, Delete } from '@nestjs/common';
import { ConceptRelationService } from './concept-relation.service';
import { AuthGuard } from '@nestjs/passport';
import { ConceptRelation } from './concept-relation.model';

@Controller('concept-relation')
export class ConceptRelationController {
    constructor(private readonly conceptRelationService: ConceptRelationService){

    }

  @Get("/list")
  @UseGuards(AuthGuard("jwt"))
  
  async getListConcept(@Req() req,@Res() res):Promise<ConceptRelation[]>{

    return res.json(await this.conceptRelationService.findAll({createdBy:req.user.result.id}))
  }

  @Post("/")
  @UseGuards(AuthGuard("jwt"))
  async addConcept(@Req() req, @Res() res):Promise<ConceptRelation>{
    let newConcept = await this.conceptRelationService.addConceptRelation(req.body,req.user.result)
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

  @Patch("/:id")
  @UseGuards(AuthGuard("jwt"))
  async updateConcept(@Req() req, @Res() res):Promise<any>{
    let newConcept = await this.conceptRelationService.updateConceptRelationById(req.params.id,req.user.result.id,req.body)
    console.log("updated: ",newConcept)
    if(newConcept.nModified == 1){      
      return res.status(HttpStatus.OK).json({message:"update OK"})
    }else{      
      throw new HttpException({
        status:HttpStatus.INTERNAL_SERVER_ERROR,
          error:"Something is not right, please try again later"
      },500)
    }
  }

  @Delete("/")
  @UseGuards(AuthGuard("jwt"))
  async deleteConcept(@Req() req, @Res() res):Promise<any>{
    console.log("current user: ",req.user.result.id)
    let deletedConcept = await this.conceptRelationService.deleteConceptRelationById(req.body.id,req.user.result.id)
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
