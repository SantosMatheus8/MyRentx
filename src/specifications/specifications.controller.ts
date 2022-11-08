import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecificationsService } from './specifications.service';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { UpdateSpecificationDto } from './dto/update-specification.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Specification } from './entities/specification.entity';

@ApiTags('Specifications')
@Controller('specifications')
export class SpecificationsController {
  constructor(private readonly specificationsService: SpecificationsService) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  create(
    @Body() createSpecificationDto: CreateSpecificationDto,
  ): Promise<Specification> {
    return this.specificationsService.create(createSpecificationDto);
  }

  @Get()
  findAll(): Promise<Specification[]> {
    return this.specificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Specification> {
    return this.specificationsService.findOne(id);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecificationDto: UpdateSpecificationDto,
  ): Promise<Specification> {
    return this.specificationsService.update(id, updateSpecificationDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Specification> {
    return this.specificationsService.remove(id);
  }
}
