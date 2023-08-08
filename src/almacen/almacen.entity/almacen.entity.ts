import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Stock } from '../../stock/stock.entity/stock.entity';

@Entity('almacen', { schema: 'carniceriaSIC' })
export class Almacen {
  @Column('int', { name: 'idAlm' })
  @PrimaryGeneratedColumn()
  idAlm: number;

  @Column('varchar', { name: 'nombreAlm', nullable: true, length: 45 })
  nombreAlm: string | null;

  @OneToMany(() => Stock, (stock) => stock.idAlm)
  stocks: Stock[];
}
