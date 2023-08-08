import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Factura } from '../../factura/factura.entity/factura.entity';
import { NotaPedido } from '../../nota-pedido/nota-pedido.entity/nota-pedido.entity';

@Index('idFactura_idx', ['idcfactura'], {})
@Index('idPedido_idx', ['idpedido'], {})
@Entity('remito', { schema: 'carniceriaSIC' })
export class Remito {
  @Column('int', { name: 'idremito' })
  @PrimaryGeneratedColumn()
  idremito: number;

  @Column('int', { name: 'idcfactura' })
  idcfactura: number;

  @Column('int', { name: 'idpedido', nullable: true })
  idpedido?: number | null;

  @Column('decimal', {
    name: 'importeFinal',
    nullable: true,
    precision: 10,
    scale: 0,
  })
  importeFinal: number | null;

  @Column('varchar', { name: 'estado', nullable: true, length: 45 })
  estado: string | null;

  @ManyToOne(() => Factura, (bfactura) => bfactura.remitos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'idcfactura', referencedColumnName: 'idbfactura' }])
  idcfactura2?: Factura;

  @ManyToOne(() => NotaPedido, (notapedido) => notapedido.remitos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'idpedido', referencedColumnName: 'idnotped' }])
  idpedido2?: NotaPedido;
}
