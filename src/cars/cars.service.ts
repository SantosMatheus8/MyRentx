import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @Inject('CarRepository')
    private carRepository: Repository<Car>,
    @Inject('CategoryRepository')
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createCarDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Não foi encontrado uma categoria com o ID informado`,
      );
    }

    const car = this.carRepository.create({
      category,
      name: createCarDto.name,
      description: createCarDto.description,
      dailyRate: createCarDto.dailyRate,
      available: createCarDto.available,
      licensePlate: createCarDto.licensePlate,
      fineAmount: createCarDto.fineAmount,
      brand: createCarDto.brand,
    });

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

    return this.carRepository.save(car);
  }

  async remove(id: string) {
    const car = await this.findOne(id);

    return this.carRepository.remove(car);
  }
}
