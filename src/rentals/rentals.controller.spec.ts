import { Test, TestingModule } from '@nestjs/testing';
import { Car } from '../cars/entities/car.entity';
import { User } from '../users/entities/user.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './entities/rental.entity';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';

const rental1 = new Rental();
rental1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
rental1.startDate = new Date('2022-11-08');
rental1.expectedReturnDate = new Date();
rental1.userId = 'f2f39367-dc78-40a6-844a-6b7fc0bc7464';
rental1.carId = 'cc2a4ee9-69f5-4629-9d61-678f9b075121';

const rental2 = new Rental();
rental2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
rental2.startDate = new Date('2022-11-02');
rental2.expectedReturnDate = new Date();
rental2.carId = 'f2f39367-dc78-40a6-844a-6b7fc0bc7464';
rental2.userId = 'cc2a4ee9-69f5-4629-9d61-678f9b075121';

const rentalList: Rental[] = [rental1, rental2];

const updatedRental = rental1;
updatedRental.carId = '23c8ac61-d308-498d-9fa0-a3867bffbbb2';

const car = new Car();
car.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';

const user = new User();
user.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';

describe('RentalsController', () => {
  let controller: RentalsController;
  let service: RentalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalsController],
      providers: [
        {
          provide: RentalsService,
          useValue: {
            create: jest.fn().mockResolvedValue(rental1),
            findAll: jest.fn().mockResolvedValue(rentalList),
            findOne: jest.fn().mockResolvedValue(rentalList[0]),
            update: jest.fn().mockResolvedValue(updatedRental),
            remove: jest.fn().mockResolvedValue(rentalList[0]),
            devolution: jest.fn().mockResolvedValue(rentalList[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<RentalsController>(RentalsController);
    service = module.get<RentalsService>(RentalsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('A rental must be created', async () => {
      const body: CreateRentalDto = {
        startDate: new Date('2022-11-08'),
        expectedReturnDate: new Date(),
        userId: 'f2f39367-dc78-40a6-844a-6b7fc0bc7464',
        carId: 'cc2a4ee9-69f5-4629-9d61-678f9b075121',
      };

      const res = await controller.create(body);

      expect(res).toEqual(rentalList[0]);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Must list all rentals', async () => {
      const res = await controller.findAll();

      expect(res).toEqual(rentalList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Must return a specific rental', async () => {
      const res = await controller.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(rentalList[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Must update a specific rental', async () => {
      const body: UpdateRentalDto = {
        carId: '23c8ac61-d308-498d-9fa0-a3867bffbbb2',
      };

      const res = await controller.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        body,
      );

      expect(res).toEqual(updatedRental);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Must delete a specific rental', async () => {
      const res = await controller.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(rentalList[0]);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });

  describe('devolution', () => {
    it('A rental must be terminated', async () => {
      const res = await controller.devolution(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(rentalList[0]);
      expect(service.devolution).toHaveBeenCalledTimes(1);
    });
  });
});
