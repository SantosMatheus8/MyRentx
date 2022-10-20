import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({ description: 'Car name' })
  name: string;

  @ApiProperty({ description: 'Car description' })
  description: string;

  @ApiProperty({ description: 'Car daily rate' })
  dailyRate: number;

  @ApiProperty({ description: 'Car availability' })
  available: boolean;

  @ApiProperty({ description: 'Car license plate' })
  licensePlate: string;

  @ApiProperty({ description: 'Car fine amount' })
  fineAmount: number;

  @ApiProperty({ description: 'Car brand' })
  brand: string;

  @ApiProperty({ description: 'Car category' })
  categoryId: string;
}
