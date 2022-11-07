import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './entities/rental.entity';

@Injectable()
export class RentalsService {
  constructor(
    @Inject('RentalRepository')
    private rentalRepository: Repository<Rental>,
    @Inject('CarRepository')
    private carRepository: Repository<Car>,
    @Inject('UserRepository') private userRepository: Repository<User>,
  ) {}

  async create(createRentalDto: CreateRentalDto) {
    const car = await this.carRepository.findOne({
      where: { id: createRentalDto.carId },
    });

    const user = await this.userRepository.findOne({
      where: { id: createRentalDto.userId },
    });

    if (!car) {
      throw new NotFoundException(
        `Não foi encontrado um carro com o ID informado`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Não foi encontrado um usuário com o ID informado`,
      );
    }

    const activeCarRental = await this.rentalRepository
      .createQueryBuilder('rental')
      .leftJoinAndSelect('rental.car', 'car')
      .where('rental.car_id LIKE :car_id', { car_id: `%${car.id}%` })
      .andWhere('rental.end_date IS NULL')
      .getOne();

    if (activeCarRental) {
      throw new BadRequestException(
        `Não foi possível cadastrar o aluguel pois o carro informado já está alugado`,
      );
    }

    const activeUserRental = await this.rentalRepository
      .createQueryBuilder('rental')
      .leftJoinAndSelect('rental.user', 'user')
      .where('rental.user_id LIKE :user_id', { user_id: `%${user.id}%` })
      .andWhere('rental.end_date IS NULL')
      .getOne();

    if (activeUserRental) {
      throw new BadRequestException(
        `Não foi possível cadastrar o aluguel pois o usuário informado já está com um carro alugado`,
      );
    }

    car.available = false;

    await this.carRepository.save(car);

    const rental = this.rentalRepository.create({
      car,
      user,
      startDate: createRentalDto.startDate,
      endDate: null,
      total: null,
      expectedReturnDate: createRentalDto.expectedReturnDate,
    });

    return this.rentalRepository.save(rental);
  }

  async findAll(userId: string) {
    if (userId) {
      const rentalsQuery = this.rentalRepository
        .createQueryBuilder('r')
        .where('user_id = :userId', { userId });

      return rentalsQuery.getMany();
    }

    return this.rentalRepository.find();
  }

  async findOne(id: string) {
    const rental = await this.rentalRepository.findOne({ where: { id } });

    if (!rental) {
      throw new NotFoundException(
        `Não foi encontrado um aluguel com o ID : ${id}`,
      );
    }

    return rental;
  }

  async update(id: string, updateRentalDto: UpdateRentalDto) {
    const rental = await this.rentalRepository.preload({
      id,
      ...updateRentalDto,
    });

    if (!rental) {
      throw new NotFoundException(
        `Não foi encontrado um aluguel com o ID : ${id}`,
      );
    }

    return this.rentalRepository.save(rental);
  }

  async remove(id: string) {
    const rental = await this.findOne(id);

    return this.rentalRepository.remove(rental);
  }

  async devolution(id: string) {
    const rental = await this.findOne(id);

    const car = await this.carRepository.findOne({
      where: { id: String(rental.carId) },
    });

    rental.endDate = new Date();

    car.available = true;

    const rentedDays =
      (rental.expectedReturnDate.getTime() - rental.startDate.getTime()) /
      (1000 * 3600 * 24);

    rental.total = Math.trunc(rentedDays) * car.dailyRate;

    const daysWithFine =
      (rental.endDate.getTime() - rental.expectedReturnDate.getTime()) /
      (1000 * 3600 * 24);

    if (daysWithFine > 0) {
      rental.total += Math.trunc(daysWithFine) * car.fineAmount;
    }

    const returnedCar = await this.carRepository.preload({
      id,
      ...car,
    });

    await this.carRepository.save(returnedCar);
    await this.rentalRepository.save(rental);

    return rental;
  }
}
