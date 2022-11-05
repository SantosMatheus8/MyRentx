import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { emailProviders } from './email.providers';
import { DatabaseModule } from 'src/database/database.module';
import { EmailClient } from 'src/clients/EmailClient';

@Module({
  imports: [DatabaseModule],
  controllers: [EmailController],
  providers: [EmailService, ...emailProviders, EmailClient],
})
export class EmailModule {}
