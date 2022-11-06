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

@ApiTags('Specifications-Cars')
@Controller('specifications-cars')
export class SpecificationsCarsController {
  constructor(
    private readonly specificationsCarsService: SpecificationsCarsService,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createSpecificationsCarDto: CreateSpecificationsCarDto) {
    return this.specificationsCarsService.create(createSpecificationsCarDto);
  }

  @Get()
  findAll() {
    return this.specificationsCarsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specificationsCarsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecificationsCarDto: UpdateSpecificationsCarDto,
  ) {
    return this.specificationsCarsService.update(
      id,
      updateSpecificationsCarDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specificationsCarsService.remove(id);
  }
}
