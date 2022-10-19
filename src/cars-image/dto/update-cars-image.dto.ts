import { PartialType } from '@nestjs/mapped-types';
import { CreateCarsImageDto } from './create-cars-image.dto';

export class UpdateCarsImageDto extends PartialType(CreateCarsImageDto) {}
