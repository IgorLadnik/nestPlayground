import { Controller, Get, Post, Req, Res, Body, HttpStatus, UsePipes, UseInterceptors } from '@nestjs/common';
import { CatService } from '../providers/cat.service';
import { Request, Response } from 'express';
import { CatDto } from '../dto/cat.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoggingInterceptor } from '../interceptors/cat.interceptor';
import { CatField } from '../decorators/catField.decorator';
import { _ } from 'lodash';

@UseInterceptors(new LoggingInterceptor())
@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    const cats = this.catService.findAll();
    res.status(HttpStatus.OK).send(JSON.stringify(cats));
  }

  @Get(':name')
  async findOne(@CatField('name') name: string, @Res() res: Response) {
    const cat = this.catService.findOne(name);
    const output = _.isNil(cat) ? 'not found' : JSON.stringify(cat);
    res.status(HttpStatus.OK).send(output);
  }

  // @Get(':id')
  // findOne1(@Param() params): string {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: CatDto, @Res() res: Response) {
    const id = this.catService.create(body);
    res.status(HttpStatus.CREATED).send(`${id}`);
  }
}
