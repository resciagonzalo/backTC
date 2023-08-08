import { Factura } from 'src/factura/factura.entity/factura.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cliente', { schema: 'carniceriaSIC' })
export class Cliente {
  @Column('int', { name: 'idcliente' })
  @PrimaryGeneratedColumn()
  idcliente: number;

  @Column('varchar', { name: 'nombreCliente', nullable: true, length: 45 })
  nombreCliente: string | null;

  @Column('varchar', { name: 'tipoCliente', nullable: true, length: 45 })
  tipoCliente: string | null;

  @Column('decimal', {
    name: 'topeDeudaCliente',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  topeDeudaCliente: string | null;

  @OneToMany(() => Factura, (factura) => factura.cliente)
  facturas: Factura[];

  @Column('decimal', {
    name: 'deudaCliente',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  deudaCliente: string | null;
}
