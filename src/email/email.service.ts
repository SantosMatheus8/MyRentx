import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EmailClient } from 'src/clients/EmailClient';
import { generateToken } from 'src/helpers/Token';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailService {
  constructor(
    @Inject('UserRepository') private userRepository: Repository<User>,
    private readonly emailClient: EmailClient,
  ) {}

  async sendEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    const token = generateToken({ id: user.id, isAdmin: user.isAdmin });

    const message = `
    <h1>Redefinição de senha!</h1>
    <p>Aqui está seu código para realizar a mudança de senha: <strong>${token.token}</strong></p>
    `;

    this.emailClient.sendMail({
      to: email,
      from: process.env.BASE_EMAIL,
      subject: 'Password Reset',
      html: message,
    });
  }
}
