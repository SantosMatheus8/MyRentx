import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { generateToken } from 'src/helpers/Token';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository') private userRepository: Repository<User>,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user.password !== password) {
      throw new BadRequestException('Email ou senha inválidos');
    }

    if (!user) {
      throw new NotFoundException('Email informado não foi encontrado');
    }

    return generateToken({ id: user.id, isAdmin: user.isAdmin });
  }
}
