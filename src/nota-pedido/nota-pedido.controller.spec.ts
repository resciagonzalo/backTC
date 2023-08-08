import { Test, TestingModule } from '@nestjs/testing';
import { NotaPedidoController } from './nota-pedido.controller';

describe('NotaPedidoController', () => {
  let controller: NotaPedidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotaPedidoController],
    }).compile();

    controller = module.get<NotaPedidoController>(NotaPedidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
