import { PartialType } from '@nestjs/swagger';
import { CreateCarsImageDto } from './create-cars-image.dto';

export class UpdateCarsImageDto extends PartialType(CreateCarsImageDto) {}
