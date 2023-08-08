import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  StreamableFile,
} from '@nestjs/common';
import { FacturaService } from './factura.service';
import { Factura } from './factura.entity/factura.entity';
import { FacturaDTO } from './dto/factura.dto';
import { Readable } from 'stream';
@Controller('factura')
export class FacturaController {
  constructor(private service: FacturaService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.get(params.id);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get('/:id/document')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'inline; filename=factura.pdf')
  async getFacturaDocument(@Param('id') id: number): Promise<StreamableFile> {
    return await this.service.getFacturaDocument(id);
  }

  @Post()
  create(@Body() factura: FacturaDTO) {
    return this.service.create(factura);
  }

  @Put()
  update(@Body() factura: Factura) {
    return this.service.update(factura);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.delete(params.id);
  }
}
