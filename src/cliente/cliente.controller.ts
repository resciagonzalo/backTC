import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity/cliente.entity';

@Controller('cliente')
export class ClienteController {
  constructor(private service: ClienteService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.get(params.id);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  create(@Body() cliente: Cliente) {
    return this.service.create(cliente);
  }

  @Put()
  update(@Body() cliente: Cliente) {
    return this.service.update(cliente);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.delete(params.id);
  }
}
