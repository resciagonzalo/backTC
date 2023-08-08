import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './factura.entity/factura.entity';
import { RemitoModule } from 'src/remito/remito.module';
import { ArticulosModule } from 'src/articulos/articulos.module';
import { FacturaProducto } from './factura-producto.entity/factura-producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Factura]),
    TypeOrmModule.forFeature([FacturaProducto]),
    RemitoModule,
    ArticulosModule,
  ],
  providers: [FacturaService],
  controllers: [FacturaController],
})
export class FacturaModule {}
