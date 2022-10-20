import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecificationDto {
  @ApiProperty({ description: 'Specification name' })
  name: string;

  @ApiProperty({ description: 'Specification description' })
  description: string;
}
