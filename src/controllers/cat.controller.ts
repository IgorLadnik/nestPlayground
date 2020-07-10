import { Controller, Get, Post, Req, Res, Body, HttpStatus, UsePipes, UseInterceptors } from '@nestjs/common';
import { CatService } from '../providers/cat.service';
import { Request, Response } from 'express';
import { CatDto } from '../dto/cat.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoggingInterceptor } from '../interceptors/cat.interceptor';

@UseInterceptors(new LoggingInterceptor())
@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get('a*')
  findAll(@Req() req: Request, @Res() res: Response) {
    const cats = this.catService.findAll();
    res.status(HttpStatus.OK).send(JSON.stringify(cats));
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: CatDto, @Res() res: Response) {
    const id = this.catService.create(body);
    res.status(HttpStatus.CREATED).send(`${id}`);
  }
}
