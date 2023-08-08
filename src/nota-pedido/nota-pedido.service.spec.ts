import { Test, TestingModule } from '@nestjs/testing';
import { NotaPedidoService } from './nota-pedido.service';

describe('NotaPedidoService', () => {
  let service: NotaPedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotaPedidoService],
    }).compile();

    service = module.get<NotaPedidoService>(NotaPedidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
