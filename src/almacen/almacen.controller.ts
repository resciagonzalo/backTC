import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { Almacen } from './almacen.entity/almacen.entity';

@Controller('almacen')
export class AlmacenController {
  constructor(private service: AlmacenService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.getAlmacen(params.id);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  create(@Body() user: Almacen) {
    return this.service.createAlmacen(user);
  }

  @Put()
  update(@Body() user: Almacen) {
    return this.service.updateAlmacen(user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteAlmacen(params.id);
  }
}
