import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Articulos } from './articulos.entity/articulos.entity';
import { UpdateArticuloDTO } from './dto/update-articulo.dto';

@Injectable()
export class ArticulosService {
  constructor(
    @InjectRepository(Articulos)
    private articuloRepository: Repository<Articulos>,
  ) {}

  async getAll(): Promise<Articulos[]> {
    return await this.articuloRepository.find();
  }

  async getAllByIds(ids: number[]): Promise<Articulos[]> {
    return await this.articuloRepository.findBy({ idArt: In(ids) });
  }

  async get(_id: number): Promise<Articulos> {
    return await this.articuloRepository.findOne({
      where: [{ idArt: _id }],
    });
  }

  async create(articulos: Articulos) {
    this.articuloRepository.insert(articulos);
  }

  async update(articulos: UpdateArticuloDTO) {
    this.articuloRepository.save(articulos);
  }

  async delete(idArt: number) {
    this.articuloRepository.delete({ idArt });
  }
}
