import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './entities/rental.entity';

@Injectable()
export class RentalsService {
  constructor(
    @Inject('RentalRepository')
    private rentalRepository: Repository<Rental>,
  ) {}

  async create(createRentalDto: CreateRentalDto) {
    const rental = this.rentalRepository.create(createRentalDto);

    return this.rentalRepository.save(rental);
  }

  async findAll() {
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
}
