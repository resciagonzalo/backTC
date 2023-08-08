import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotaPedido } from '../../nota-pedido/nota-pedido.entity/nota-pedido.entity';
import { FacturaProducto } from 'src/factura/factura-producto.entity/factura-producto.entity';

@Entity('articulos', { schema: 'carniceriaSIC' })
export class Articulos {
  @Column('int', { name: 'idArt' })
  @PrimaryGeneratedColumn()
  idArt: number;

  @Column('varchar', { name: 'nombreArt', length: 45 })
  nombreArt: string;

  @Column('decimal', { name: 'precioArt', precision: 5, scale: 0 })
  precioArt: string;

  @Column('varchar', { name: 'tipoArt', length: 45 })
  tipoArt: string;

  @OneToMany(
    () => FacturaProducto,
    (facturaProducto) => facturaProducto.articulo,
  )
  facturaProducto: FacturaProducto[];

  @OneToMany(() => NotaPedido, (notaPedido) => notaPedido.idArt2)
  notpeds: NotaPedido[];

  @Column({ default: true })
  isActive: boolean;
}
