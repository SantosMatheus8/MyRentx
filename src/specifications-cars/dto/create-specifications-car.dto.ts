import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecificationsCarDto {
  @ApiProperty({ description: 'Car id' })
  car_id: string;

  @ApiProperty({ description: 'Specification id' })
  specification_id: string;
}
