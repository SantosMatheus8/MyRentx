import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordUserDto } from './dto/updatePassword-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as dotenv from 'dotenv';

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

const updatedUser = user1;
updatedUser.isAdmin = false;

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(user1),
            findAll: jest.fn().mockResolvedValue(userList),
            findOne: jest.fn().mockResolvedValue(userList[0]),
            update: jest.fn().mockResolvedValue(updatedUser),
            remove: jest.fn().mockResolvedValue(userList[0]),
            updatePassword: jest.fn().mockResolvedValue(userList[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('A user must be created', async () => {
      const body: CreateUserDto = {
        name: 'Matheus',
        email: 'matheus@gmail.com',
        password: '123',
        avatar: 'avata:r.png',
        driverLicense: '23490234890',
        isAdmin: true,
      };

      const res = await controller.create(body);

      expect(res).toEqual(userList[0]);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Must list all users', async () => {
      const res = await controller.findAll();

      expect(res).toEqual(userList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Must return a specific user', async () => {
      const res = await controller.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(userList[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Must update a specific user', async () => {
      const body: UpdateUserDto = { isAdmin: false };

      const res = await controller.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        body,
      );

      expect(res).toEqual(updatedUser);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Must delete a specific user', async () => {
      const res = await controller.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(userList[0]);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });

  describe('updatePassword', () => {
    it('User password must be reset', async () => {
      const body: UpdatePasswordUserDto = {
        verificationCode: process.env.VERIFICATION_CODE,
        password: '123',
      };

      const res = await controller.updatePassword(body);

      expect(res).toEqual(userList[0]);
      expect(service.updatePassword).toHaveBeenCalledTimes(1);
    });
  });
});
