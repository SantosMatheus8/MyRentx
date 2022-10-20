import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
  @ApiProperty({ description: 'Car id' })
  carId: string;

  @ApiProperty({ description: 'User id' })
  userId: string;

  @ApiProperty({ description: 'Rental start date' })
  startDate: Date;

  @ApiProperty({ description: 'Rental end date' })
  endDate: Date;

  @ApiProperty({ description: 'Expected return of the car ' })
  expectedReturnDate: Date;

  @ApiProperty({ description: 'Total rental price' })
  total: number;
}
