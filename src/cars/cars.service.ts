import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const category = await this.categoryRepository.findOne({
      where: { id: createCarDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Não foi encontrado uma categoria com o ID informado`,
      );
    }

    const licensePlate = await this.carRepository.findOne({
      where: { licensePlate: createCarDto.licensePlate },
    });

    if (licensePlate) {
      throw new BadRequestException('A placa informada já existe');
    }

    const car = this.carRepository.create({
      category,
      name: createCarDto.name,
      description: createCarDto.description,
      dailyRate: createCarDto.dailyRate,
      licensePlate: createCarDto.licensePlate,
      fineAmount: createCarDto.fineAmount,
      brand: createCarDto.brand,
    });

    return this.carRepository.save(car);
  }

  async findAll(
    brand?: string,
    categoryId?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = this.carRepository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }

    if (categoryId) {
      carsQuery.andWhere('category_id = :categoryId', { categoryId });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findOne(id: string): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id } });

    if (!car) {
      throw new NotFoundException(
        `Não foi encontrado um carro com o ID: ${id}`,
      );
    }

    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.carRepository.preload({ id, ...updateCarDto });

    if (!car) {
      throw new NotFoundException(
        `Não foi encontrado um carro com o ID: ${id}`,
      );
    }

    return this.carRepository.save(car);
  }

  async remove(id: string): Promise<Car> {
    const car = await this.findOne(id);

    return this.carRepository.remove(car);
  }
}
