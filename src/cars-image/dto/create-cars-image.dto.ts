import { ApiProperty } from '@nestjs/swagger';

export class CreateCarsImageDto {
  @ApiProperty({ description: 'Image name' })
  name: string;

  @ApiProperty({ description: 'Image description' })
  description: string;

  @ApiProperty({ description: 'Car id' })
  carId: string;
}
