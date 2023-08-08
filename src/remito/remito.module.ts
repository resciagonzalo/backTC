import { Module } from '@nestjs/common';
import { RemitoService } from './remito.service';
import { RemitoController } from './remito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remito } from './remito.entity/remito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Remito])],
  providers: [RemitoService],
  controllers: [RemitoController],
  exports: [RemitoService],
})
export class RemitoModule {}
