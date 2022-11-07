import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Car } from './entities/car.entity';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll(
    @Query('brand') brand?: string,
    @Query('name')
    name?: string,
    @Query('categoryId')
    categoryId?: string,
  ): Promise<Car[]> {
    return this.carsService.findAll(brand, categoryId, name);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Car> {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Car> {
    return this.carsService.remove(id);
  }
}
