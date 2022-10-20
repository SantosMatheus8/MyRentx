import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Username' })
  name: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User password' })
  password: string;

  @ApiProperty({ description: 'User avatar' })
  avatar: string;

  @ApiProperty({ description: 'User driver license' })
  driverLicense: string;

  @ApiProperty({ description: 'If the user is admin or not' })
  isAdmin: boolean;
}
