import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Remito } from './Remito.entity/Remito.entity';
import { RemitoDTO } from './dto/remito.dto';

@Injectable()
export class RemitoService {
  constructor(
    @InjectRepository(Remito)
    private remitoRepository: Repository<Remito>,
  ) {}

  async getAll(): Promise<Remito[]> {
    return await this.remitoRepository.find();
  }

  async get(_id: number): Promise<Remito[]> {
    return await this.remitoRepository.find({
      where: [{ idremito: _id }],
    });
  }

  async create(Remito: RemitoDTO) {
    this.remitoRepository.save(Remito);
  }

  async update(Remito: Remito) {
    console.log(Remito);
    this.remitoRepository.save(Remito);
  }

  async delete(Remito: Remito) {
    this.remitoRepository.delete(Remito);
  }
}
