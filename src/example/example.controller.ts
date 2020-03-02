import { Controller, Get, UseGuards, Req, Res, Post, HttpStatus, HttpException, Delete, Patch } from "@nestjs/common";
import { ExampleService } from "./example.service";
import { AuthGuard } from "@nestjs/passport";
import { Example } from "./example.model";

@Controller("examples")
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get("/list")
  @UseGuards(AuthGuard("jwt"))
  async getListExample(@Req() req, @Res() res): Promise<Example[]> {
    return res.json(
      await this.exampleService.findAll({ createdBy: req.user.result.id })
    );
  }

  @Post("/")
  @UseGuards(AuthGuard("jwt"))
  async addExample(@Req() req, @Res() res): Promise<Example> {
    let newExample = await this.exampleService.addExample(
      req.body,
      req.user.result
    );
    if (newExample.id) {
      return res.status(HttpStatus.CREATED).json(newExample);
    } else {
      // return res.status(HttpStatus.SERVICE_UNAVAILABLE).json("add Example fail")
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Something is not right, please try again later"
        },
        500
      );
    }
  }

  @Patch("/:id")
  @UseGuards(AuthGuard("jwt"))
  async updateExample(@Req() req, @Res() res): Promise<Example> {
    let newExample = await this.exampleService.updateExampleById(
      req.params.id,
      req.user.result.id,
      req.body
    );
    console.log("updated: ", newExample);
    if (newExample.nModified == 1) {
      return res.status(HttpStatus.OK).json({message:"update OK"})
    } else {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Something is not right, please try again later"
        },
        500
      );
    }
  }

  @Delete("/")
  @UseGuards(AuthGuard("jwt"))
  async deleteExample(@Req() req, @Res() res): Promise<Example> {
    console.log("current user: ", req.user.result.id);
    let deletedExample = await this.exampleService.deleteExampleById(
      req.body.id,
      req.user.result.id
    );
    console.log("deleted: ", deletedExample);
    if (deletedExample) {
      return res.status(HttpStatus.OK).json({ deleted: deletedExample });
    } else {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Something is not right, please try again later"
        },
        500
      );
    }
  }
}
