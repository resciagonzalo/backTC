import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { NotaPedidoService } from './nota-pedido.service';
import { NotaPedido } from './nota-pedido.entity/nota-pedido.entity';

@Controller('nota-pedido')
export class NotaPedidoController {
  constructor(private service: NotaPedidoService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.get(params.id);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  create(@Body() notaPedido: NotaPedido) {
    return this.service.create(notaPedido);
  }

  @Put()
  update(@Body() notaPedido: NotaPedido) {
    return this.service.update(notaPedido);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.delete(params.id);
  }
}
