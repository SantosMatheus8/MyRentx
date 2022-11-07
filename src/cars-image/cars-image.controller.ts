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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarsImage } from './entities/cars-image.entity';

@ApiTags('Cars-Image')
@Controller('cars-image')
export class CarsImageController {
  constructor(private readonly carsImageService: CarsImageService) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createCarsImageDto: CreateCarsImageDto): Promise<CarsImage> {
    return this.carsImageService.create(createCarsImageDto);
  }

  @Get()
  findAll(): Promise<CarsImage[]> {
    return this.carsImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CarsImage> {
    return this.carsImageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarsImageDto: UpdateCarsImageDto,
  ): Promise<CarsImage> {
    return this.carsImageService.update(id, updateCarsImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<CarsImage> {
    return this.carsImageService.remove(id);
  }
}
