import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Factura } from '../factura.entity/factura.entity';
import { Articulos } from '../../articulos/articulos.entity/articulos.entity';

@Entity('facturaProducto', { schema: 'carniceriaSIC' })
export class FacturaProducto {
  @Column('int', { name: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { primary: true, name: 'idbfactura' })
  idbfactura: number;

  @Column('int', { name: 'idArticulo' })
  idArticulo: number;

  @Column('int', { name: 'cantidad' })
  cantidad: number;

  @ManyToOne(() => Factura, (factura) => factura.facturaProductos)
  @JoinColumn({ name: 'idbfactura' })
  factura: Factura;

  @ManyToOne(() => Articulos, (articulo) => articulo.facturaProducto)
  @JoinColumn({ name: 'idArticulo' })
  articulo: Articulos;
}
