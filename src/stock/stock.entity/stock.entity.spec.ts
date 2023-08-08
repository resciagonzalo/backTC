import { Stock } from './stock.entity';

describe('StockEntity', () => {
  it('should be defined', () => {
    expect(new Stock()).toBeDefined();
  });
});
