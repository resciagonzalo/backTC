import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { Stock } from './stock.entity/stock.entity';
import { UpdateStockDTO } from './dto/stock-update.dto';

@Controller('stock')
export class StockController {
  constructor(private service: StockService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.get(params.id);
  }

  @Get()
  getAll(@Query() params) {
    return this.service.getAll(params);
  }

  @Post()
  create(@Body() stock: Stock) {
    return this.service.create(stock);
  }

  @Put()
  update(@Body() stock: UpdateStockDTO) {
    console.log('ENTRO');

    return this.service.update(stock);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.delete(params.id);
  }
}
