import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlmacenModule } from './almacen/almacen.module';
import { ArticulosModule } from './articulos/articulos.module';
import { ClienteModule } from './cliente/cliente.module';
import { RemitoModule } from './remito/remito.module';
import { StockModule } from './stock/stock.module';
import { NotaPedidoModule } from './nota-pedido/nota-pedido.module';
import { FacturaModule } from './factura/factura.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // This should be set correctly
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'bocalomas',
      database: 'carniceriaSIC',
      entities: [__dirname + '/**/*.entity/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AlmacenModule,
    ArticulosModule,
    ClienteModule,
    RemitoModule,
    StockModule,
    NotaPedidoModule,
    FacturaModule,
  ],
})
export class AppModule {}
