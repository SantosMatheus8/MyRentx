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
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Rental } from './entities/rental.entity';

@ApiTags('Rentals')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createRentalDto: CreateRentalDto): Promise<Rental> {
    return this.rentalsService.create(createRentalDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiQuery({
    name: 'userId',
    required: false,
  })
  @Get()
  findAll(@Query('userId') userId?: string): Promise<Rental[]> {
    return this.rentalsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Rental> {
    return this.rentalsService.findOne(id);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRentalDto: UpdateRentalDto,
  ): Promise<Rental> {
    return this.rentalsService.update(id, updateRentalDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Rental> {
    return this.rentalsService.remove(id);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch('devolution/:id')
  devolution(@Param('id') id: string): Promise<Rental> {
    return this.rentalsService.devolution(id);
  }
}
