import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { passwordHash } from 'src/helpers/PasswordHash';
import { generateToken, verifyToken } from 'src/helpers/Token';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordUserDto } from './dto/updatePassword-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const user = this.userRepository.create({ ...createUserDto });

    user.password = passwordHash(createUserDto.password);

    const newUser = await this.userRepository.save(user);

    return {
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      driverLicense: newUser.driverLicense,
      isAdmin: newUser.isAdmin,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(
        `Não foi encontrado um usuário com o ID : ${id}`,
      );
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({ id, ...updateUserDto });

    if (!user) {
      throw new NotFoundException(
        `Não foi encontrado um usuário com o ID : ${id}`,
      );
    }

    user.password = passwordHash(updateUserDto.password);

    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);

    return this.userRepository.remove(user);
  }

  async updatePassword(
    updatePasswordUserDto: UpdatePasswordUserDto,
  ): Promise<Partial<User>> {
    const { verificationCode, password } = updatePasswordUserDto;

    const token = verifyToken(verificationCode);

    const user = await this.findOne(token.id);

    user.password = passwordHash(password);

    const updatedUser = await this.userRepository.save(user);

    return {
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      driverLicense: updatedUser.driverLicense,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
      updatedAt: new Date(),
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Email informado não foi encontrado');
    }

    if (user.password !== passwordHash(password)) {
      throw new BadRequestException('Email ou senha inválidos');
    }

    return generateToken({ id: user.id, isAdmin: user.isAdmin });
  }
}
