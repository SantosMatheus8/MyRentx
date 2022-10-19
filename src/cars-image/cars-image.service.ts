import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCarsImageDto } from './dto/create-cars-image.dto';
import { UpdateCarsImageDto } from './dto/update-cars-image.dto';
import { CarsImage } from './entities/cars-image.entity';

@Injectable()
export class CarsImageService {
  constructor(
    @Inject('CarsImageRepository')
    private carsImageRepository: Repository<CarsImage>,
  ) {}

  async create(createCarsImageDto: CreateCarsImageDto) {
    const carImage = this.carsImageRepository.create(createCarsImageDto);

    return this.carsImageRepository.save(carImage);
  }

  async findAll() {
    return this.carsImageRepository.find();
  }

  async findOne(id: string) {
    const carImage = await this.carsImageRepository.findOne({ where: { id } });

    if (!carImage) {
      throw new NotFoundException(
        `Não foi encontrado uma imagem com o ID : ${id}`,
      );
    }

    return carImage;
  }

  async update(id: string, updateCarsImageDto: UpdateCarsImageDto) {
    const carImage = await this.carsImageRepository.preload({
      id,
      ...updateCarsImageDto,
    });

    if (!carImage) {
      throw new NotFoundException(
        `Não foi encontrado uma imagem com o ID : ${id}`,
      );
    }

    return this.carsImageRepository.save(carImage);
  }

  async remove(id: string) {
    const carImage = await this.findOne(id);

    return this.carsImageRepository.remove(carImage);
  }
}
