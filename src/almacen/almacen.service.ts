import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Almacen } from './almacen.entity/almacen.entity';

@Injectable()
export class AlmacenService {
  constructor(
    @InjectRepository(Almacen) private almacenRepository: Repository<Almacen>,
  ) {}

  async getAll(): Promise<Almacen[]> {
    return await this.almacenRepository.find();
  }

  async getAlmacen(_id: number): Promise<Almacen[]> {
    return await this.almacenRepository.find({
      where: [{ idAlm: _id }],
    });
  }

  async createAlmacen(almacen: Almacen) {
    this.almacenRepository.insert(almacen);
  }

  async updateAlmacen(almacen: Almacen) {
    this.almacenRepository.save(almacen);
  }

  async deleteAlmacen(almacen: Almacen) {
    this.almacenRepository.delete(almacen);
  }
}
