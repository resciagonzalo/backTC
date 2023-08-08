import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RemitoService } from './remito.service';
import { Remito } from './remito.entity/remito.entity';
import { RemitoDTO } from './dto/remito.dto';

@Controller('remito')
export class RemitoController {
  constructor(private service: RemitoService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.get(params.id);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  create(@Body() remito: RemitoDTO) {
    return this.service.create(remito);
  }

  @Put()
  update(@Body() remito: Remito) {
    return this.service.update(remito);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.delete(params.id);
  }
}
