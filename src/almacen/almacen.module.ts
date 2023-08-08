import { Module } from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { AlmacenController } from './almacen.controller';
import { Almacen } from './almacen.entity/almacen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Almacen])],
  providers: [AlmacenService],
  controllers: [AlmacenController],
})
export class AlmacenModule {}
