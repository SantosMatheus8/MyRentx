import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarsImageService } from './cars-image.service';
import { CreateCarsImageDto } from './dto/create-cars-image.dto';
import { UpdateCarsImageDto } from './dto/update-cars-image.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cars-Image')
@Controller('cars-image')
export class CarsImageController {
  constructor(private readonly carsImageService: CarsImageService) {}

  @Post()
  create(@Body() createCarsImageDto: CreateCarsImageDto) {
    return this.carsImageService.create(createCarsImageDto);
  }

  @Get()
  findAll() {
    return this.carsImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsImageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarsImageDto: UpdateCarsImageDto,
  ) {
    return this.carsImageService.update(id, updateCarsImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsImageService.remove(id);
  }
}
