import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordUserDto {
  @ApiProperty({ description: 'Checker code to allow the change' })
  verificationCode: string;

  @ApiProperty({ description: 'New user password' })
  password: string;
}
