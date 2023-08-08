import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotaPedido } from '../../nota-pedido/nota-pedido.entity/nota-pedido.entity';
import { Remito } from '../../remito/remito.entity/remito.entity';
import { FacturaProducto } from '../factura-producto.entity/factura-producto.entity';
import { Cliente } from 'src/cliente/cliente.entity/cliente.entity';

@Index('idPed_idx', ['notaPedido'], {})
@Entity('factura', { schema: 'carniceriaSIC' })
export class Factura {
  @Column('int', { name: 'idbfactura' })
  @PrimaryGeneratedColumn()
  idbfactura: number;

  @Column('int', { name: 'idpedido', nullable: true })
  idPedido?: number;

  @Column('int', { name: 'idCliente' })
  idCliente: number;

  @Column('int', { name: 'precio' })
  precio: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(
    () => FacturaProducto,
    (facturaProducto) => facturaProducto.factura,
  )
  facturaProductos: FacturaProducto[];

  @ManyToOne(() => Cliente, (cliente) => cliente.facturas, {
    eager: true, // This ensures the related Cliente is always loaded when you fetch a Factura.
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'idCliente' }) // Specify the foreign key here
  cliente: Cliente;

  @ManyToOne(() => NotaPedido, (notped) => notped.facturas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'idpedido', referencedColumnName: 'idnotped' }])
  notaPedido?: NotaPedido;

  @OneToMany(() => Remito, (remito) => remito.idcfactura2)
  remitos: Remito[];
}
