import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Factura } from '../../factura/factura.entity/factura.entity';
import { Articulos } from '../../articulos/articulos.entity/articulos.entity';
import { Remito } from '../../remito/remito.entity/remito.entity';

@Index('idArt_idx', ['idArt'], {})
@Entity('nota-pedido', { schema: 'carniceriaSIC' })
export class NotaPedido {
  @Column('int', { name: 'idnotped' })
  @PrimaryGeneratedColumn()
  idnotped: number;

  @Column('int', { primary: true, name: 'idArt' })
  idArt: number;

  @Column('int', { name: 'cantidadArt' })
  cantidadArt: number;

  @OneToMany(() => Factura, (bfactura) => bfactura.idPedido)
  facturas: Factura[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Articulos, (articulos) => articulos.notpeds, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'idArt', referencedColumnName: 'idArt' }])
  idArt2: Articulos;

  @OneToMany(() => Remito, (remito) => remito.idpedido2)
  remitos: Remito[];
}
