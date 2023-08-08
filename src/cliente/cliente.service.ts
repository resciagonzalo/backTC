import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async getAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async get(_id: number): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      where: [{ idcliente: _id }],
    });
  }

  async create(Cliente: Cliente) {
    this.clienteRepository.insert(Cliente);
  }

  async update(Cliente: Cliente) {
    this.clienteRepository.save(Cliente);
  }

  async delete(Cliente: Cliente) {
    this.clienteRepository.delete(Cliente);
  }
}
