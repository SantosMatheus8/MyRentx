import { Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async email(@Headers('email') email: string) {
    return this.emailService.sendEmail(email);
  }
}
