import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './Stock.entity/Stock.entity';
import { UpdateStockDTO } from './dto/stock-update.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  async getAll(params: any): Promise<Stock[]> {
    return await this.stockRepository
      .createQueryBuilder('stock')
      .where(params)
      .innerJoinAndSelect(
        'stock.articulo',
        'articulo',
        'articulo.isActive = :isActive',
        { isActive: true },
      )
      .getMany();
  }

  async get(_id: number): Promise<Stock> {
    return await this.stockRepository.findOne({
      where: [{ idArt: _id }],
    });
  }

  async create(stock: Stock) {
    this.stockRepository.insert(stock);
  }

  async update(stock: UpdateStockDTO) {
    console.log(stock);

    this.stockRepository.save(stock);
  }

  async delete(id: number) {
    this.stockRepository.delete(id);
  }
}
