import { Injectable } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface';
import { CatDto } from '../dto/cat.dto';

@Injectable()
export class CatService {
  private static count = 0;
  private cats = new Array<Cat>();

  findAll(): Cat[] {
    return this.cats;
  }

  create(catDto: CatDto): number {
    this.cats.push({
      id: ++CatService.count,
      name: catDto.name,
      yearOfBirth: catDto.yearOfBirth,
      breed: catDto.breed
    });

    return CatService.count;
  }
}
