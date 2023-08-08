import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotaPedido } from './nota-pedido.entity/nota-pedido.entity';

@Injectable()
export class NotaPedidoService {
  constructor(
    @InjectRepository(NotaPedido)
    private notaPedidoRepository: Repository<NotaPedido>,
  ) {}

  async getAll(): Promise<NotaPedido[]> {
    return await this.notaPedidoRepository.find();
  }

  async get(_id: number): Promise<NotaPedido[]> {
    return await this.notaPedidoRepository.find({
      where: [{ idArt: _id }],
    });
  }

  async create(NotaPedido: NotaPedido) {
    this.notaPedidoRepository.insert(NotaPedido);
  }

  async update(NotaPedido: NotaPedido) {
    this.notaPedidoRepository.save(NotaPedido);
  }

  async delete(NotaPedido: NotaPedido) {
    this.notaPedidoRepository.delete(NotaPedido);
  }
}
