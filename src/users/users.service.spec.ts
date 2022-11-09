import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { passwordHash } from '../helpers/PasswordHash';

dotenv.config();

const user1 = new User();
user1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
user1.name = 'Matheus';
user1.email = 'matheus@gmail.com';
user1.avatar = 'avatar.png';
user1.driverLicense = '23490234890';
user1.isAdmin = true;
user1.createdAt = undefined;
user1.updatedAt = undefined;

const user2 = new User();
user2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
user2.name = 'Pietro';
user2.email = 'pietro@gmail.com';
user2.avatar = 'avatar.png';
user2.driverLicense = '234923482390';
user2.isAdmin = false;
user2.createdAt = undefined;
user2.updatedAt = undefined;

const userList: User[] = [user1, user2];

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userList),
            create: jest.fn().mockResolvedValue(userList[0]),
            save: jest.fn().mockResolvedValue(userList[0]),
            findOne: jest.fn().mockResolvedValue(userList[0]),
            preload: jest.fn().mockResolvedValue(userList[0]),
            remove: jest.fn().mockResolvedValue(userList[0]),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('A user must be created', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const user = await service.create({
        name: 'Matheus',
        email: 'matheus@gmail.com',
        password: '123',
        avatar: 'avatar.png',
        driverLicense: '23490234890',
        isAdmin: true,
      });

      expect(user).toEqual(userList[0]);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  it('Should return error of email already registered', async () => {
    try {
      await service.create({
        name: 'Matheus',
        email: 'matheus@gmail.com',
        password: '123',
        avatar: 'avatar.png',
        driverLicense: '23490234890',
        isAdmin: true,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('O email informado já está cadastrado');
    }
  });

  it('Should return error of email already registered', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

    try {
      await service.create({
        name: 'Matheus',
        email: 'matheus@gmail.com',
        password: '123',
        avatar: 'avatar.png',
        driverLicense: '23490234890',
        isAdmin: true,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual(
        `A licença de motorista informada já está cadastrada`,
      );
    }
  });

  describe('findAll', () => {
    it('Must be list all users', async () => {
      const users = await service.findAll();

      expect(users).toEqual(userList);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Must return a specific user', async () => {
      const user = await service.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(user).toEqual(userList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      try {
        await service.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado um usuário com o ID : 1`,
        );
      }
    });
  });

  describe('update', () => {
    it('Must update a specific user', async () => {
      const updatedUser = user1;
      updatedUser.isAdmin = false;

      jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedUser);

      const user = await service.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        { isAdmin: false, password: '12345' },
      );

      expect(user).toEqual({
        driverLicense: '23490234890',
        email: 'matheus@gmail.com',
        avatar: 'avatar.png',
        id: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        isAdmin: false,
        name: 'Matheus',
        createdAt: undefined,
        updatedAt: undefined,
      });
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'preload').mockResolvedValueOnce(undefined);

      try {
        await service.update('1', { isAdmin: false });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado um usuário com o ID : 1`,
        );
      }
    });
  });

  describe('remove', () => {
    it('Must delete a specific user', async () => {
      const user = await service.remove('1ca415c6-32be-488c-b7bf-12b8649c99bd');

      expect(user).toBe(userList[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      try {
        await service.remove('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado um usuário com o ID : 1`,
        );
      }
    });
  });

  describe('login', () => {
    it('Should return invalid email or password error', async () => {
      try {
        await service.login('matheus@gmail.com', '123');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Email ou senha inválidos');
      }
    });

    it('Must return auth token', async () => {
      user1.password = passwordHash('123');

      const login = await service.login('matheus@gmail.com', '123');

      expect(login).toHaveProperty('token');
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should return NotFoundException error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      try {
        await service.login('matheus@gmail.com', '123');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Email informado não foi encontrado');
      }
    });
  });

  describe('updatePassword', () => {
    it('User password must be reset', async () => {
      const user = await service.updatePassword({
        verificationCode: process.env.VERIFICATION_CODE,
        password: '123',
      });

      expect(user.id).toEqual('1ca415c6-32be-488c-b7bf-12b8649c99bd');
      expect(user.email).toEqual('matheus@gmail.com');
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
