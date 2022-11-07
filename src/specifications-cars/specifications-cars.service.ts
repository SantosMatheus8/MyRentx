import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from 'src/cars/entities/car.entity';
import { Specification } from 'src/specifications/entities/specification.entity';
import { Repository } from 'typeorm';
import { CreateSpecificationsCarDto } from './dto/create-specifications-car.dto';
import { UpdateSpecificationsCarDto } from './dto/update-specifications-car.dto';
import { SpecificationsCar } from './entities/specifications-car.entity';

@Injectable()
export class SpecificationsCarsService {
  constructor(
    @Inject('SpecificationsCarsRepository')
    private specificationsCarsRepository: Repository<SpecificationsCar>,
    @Inject('SpecificationRepository')
    private specificationRepository: Repository<Specification>,
    @Inject('CarRepository')
    private carRepository: Repository<Car>,
  ) {}

  async create(createSpecificationsCarDto: CreateSpecificationsCarDto) {
    const specification = await this.specificationRepository.findOne({
      where: { id: createSpecificationsCarDto.specification_id },
    });

    if (!specification) {
      throw new NotFoundException(
        `Não foi encontrado uma especificação com o ID : ${createSpecificationsCarDto.specification_id}`,
      );
    }

    const car = await this.carRepository.findOne({
      where: { id: createSpecificationsCarDto.car_id },
    });

    if (!car) {
      throw new NotFoundException(
        `Não foi encontrado um carro com o ID: ${createSpecificationsCarDto.car_id}`,
      );
    }

    const specificationCarAlreadyExists =
      await this.specificationsCarsRepository
        .createQueryBuilder('specifications_cars')
        .leftJoinAndSelect('specifications_cars.car', 'car')
        .where('specifications_cars.car_id LIKE :car_id', {
          car_id: `%${car.id}%`,
        })
        .andWhere(
          'specifications_cars.specification_id LIKE :specification_id',
          {
            specification_id: `%${specification.id}%`,
          },
        )
        .getOne();

    if (specificationCarAlreadyExists) {
      throw new BadRequestException(
        `Não é possível cadastrar uma especificação já existente para o mesmo carro`,
      );
    }

    const specificationCar = this.specificationsCarsRepository.create({
      carId: car.id,
      specificationId: specification.id,
    });

    return this.specificationsCarsRepository.save(specificationCar);
  }

  async findAll() {
    return this.specificationsCarsRepository.find();
  }

  async findOne(id: string) {
    const specificationCar = await this.specificationsCarsRepository.findOne({
      where: { id },
    });

    if (!specificationCar) {
      throw new NotFoundException(
        `Não foi encontrado uma especificação para o carro com o ID : ${id}`,
      );
    }

    return specificationCar;
  }

  async update(
    id: string,
    updateSpecificationsCarDto: UpdateSpecificationsCarDto,
  ) {
    const specificationCar = await this.specificationsCarsRepository.preload({
      id,
      ...updateSpecificationsCarDto,
    });

    if (!specificationCar) {
      throw new NotFoundException(
        `Não foi encontrado uma especificação para o carro com o ID : ${id}`,
      );
    }

    return this.specificationsCarsRepository.save(specificationCar);
  }

  async remove(id: string) {
    const specificationCar = await this.findOne(id);

    return specificationCar;
  }
}
