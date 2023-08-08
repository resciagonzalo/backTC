import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticulosService } from './articulos.service';
import { Articulos } from './articulos.entity/articulos.entity';
import { UpdateArticuloDTO } from './dto/update-articulo.dto';

@Controller('articulos')
export class ArticulosController {
  constructor(private service: ArticulosService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.get(params.id);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  create(@Body() articulo: Articulos) {
    return this.service.create(articulo);
  }

  @Put()
  update(@Body() articulo: UpdateArticuloDTO) {
    return this.service.update(articulo);
  }

  @Delete(':id')
  async delete(@Param() params) {
    const art = await this.service.get(params.id);
    art.isActive = false;
    return this.service.update(art);
  }
}
