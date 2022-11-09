import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';

const user1 = new User();
user1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
user1.name = 'Matheus';
user1.email = 'matheus@gmail.com';
user1.password = '123';
user1.avatar = 'avatar.png';
user1.driverLicense = '23490234890';
user1.isAdmin = true;

const user2 = new User();
user2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
user2.name = 'Pietro';
user2.email = 'pietro@gmail.com';
user2.password = '1234';
user2.avatar = 'avatar.png';
user2.driverLicense = '234923482390';
user2.isAdmin = false;

const updatedUser = user1;
updatedUser.isAdmin = false;

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
});
