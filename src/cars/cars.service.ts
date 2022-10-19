import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @Inject('CarRepository')
    private carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const car = this.carRepository.create(createCarDto);

    return this.carRepository.save(car);
  }

  async findAll() {
    return this.carRepository.find();
  }

  async findOne(id: string) {
    const car = await this.carRepository.findOne({ where: { id } });

    if (!car) {
      throw new NotFoundException(
        `Não foi encontrado um carro com o ID: ${id}`,
      );
    }

    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const car = await this.carRepository.preload({ id, ...updateCarDto });

    if (!car) {
      throw new NotFoundException(
        `Não foi encontrado um carro com o ID: ${id}`,
      );
    }

    return car;
  }

  async remove(id: string) {
    const car = this.findOne(id);

    return car;
  }
}
