import { Module } from '@nestjs/common';
import { NotaPedidoService } from './nota-pedido.service';
import { NotaPedidoController } from './nota-pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaPedido } from './nota-pedido.entity/nota-pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotaPedido])],
  providers: [NotaPedidoService],
  controllers: [NotaPedidoController],
})
export class NotaPedidoModule {}
