import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({ ...createUserDto });

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

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(
        `Não foi encontrado um usuário com o ID : ${id}`,
      );
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...updateUserDto });

    if (!user) {
      throw new NotFoundException(
        `Não foi encontrado um usuário com o ID : ${id}`,
      );
    }

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    return this.userRepository.remove(user);
  }
}
