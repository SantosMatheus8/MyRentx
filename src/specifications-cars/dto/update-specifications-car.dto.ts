import { PartialType } from '@nestjs/swagger';
import { CreateSpecificationsCarDto } from './create-specifications-car.dto';

export class UpdateSpecificationsCarDto extends PartialType(
  CreateSpecificationsCarDto,
) {}
