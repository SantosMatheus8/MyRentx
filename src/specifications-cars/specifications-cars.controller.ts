import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecificationsCarsService } from './specifications-cars.service';
import { CreateSpecificationsCarDto } from './dto/create-specifications-car.dto';
import { UpdateSpecificationsCarDto } from './dto/update-specifications-car.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SpecificationsCar } from './entities/specifications-car.entity';

@ApiTags('Specifications-Cars')
@Controller('specifications-cars')
export class SpecificationsCarsController {
  constructor(
    private readonly specificationsCarsService: SpecificationsCarsService,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  create(
    @Body() createSpecificationsCarDto: CreateSpecificationsCarDto,
  ): Promise<SpecificationsCar> {
    return this.specificationsCarsService.create(createSpecificationsCarDto);
  }

  @Get()
  findAll(): Promise<SpecificationsCar[]> {
    return this.specificationsCarsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SpecificationsCar> {
    return this.specificationsCarsService.findOne(id);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecificationsCarDto: UpdateSpecificationsCarDto,
  ): Promise<SpecificationsCar> {
    return this.specificationsCarsService.update(
      id,
      updateSpecificationsCarDto,
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<SpecificationsCar> {
    return this.specificationsCarsService.remove(id);
  }
}
