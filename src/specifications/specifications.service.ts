import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { UpdateSpecificationDto } from './dto/update-specification.dto';
import { Specification } from './entities/specification.entity';

@Injectable()
export class SpecificationsService {
  constructor(
    @Inject('SpecificationRepository')
    private specificationRepository: Repository<Specification>,
  ) {}

  async create(
    createSpecificationDto: CreateSpecificationDto,
  ): Promise<Specification> {
    const specification = this.specificationRepository.create(
      createSpecificationDto,
    );

    return this.specificationRepository.save(specification);
  }

  async findAll(): Promise<Specification[]> {
    return this.specificationRepository.find();
  }

  async findOne(id: string): Promise<Specification> {
    const specification = await this.specificationRepository.findOne({
      where: { id },
    });

    if (!specification) {
      throw new NotFoundException(
        `Não foi encontrado uma especificação com o ID : ${id}`,
      );
    }

    return specification;
  }

  async update(
    id: string,
    updateSpecificationDto: UpdateSpecificationDto,
  ): Promise<Specification> {
    const specification = await this.specificationRepository.preload({
      id,
      ...updateSpecificationDto,
    });

    if (!specification) {
      throw new NotFoundException(
        `Não foi encontrado uma especificação com o ID : ${id}`,
      );
    }

    return this.specificationRepository.save(specification);
  }

  async remove(id: string): Promise<Specification> {
    const specification = await this.findOne(id);

    return this.specificationRepository.remove(specification);
  }
}
