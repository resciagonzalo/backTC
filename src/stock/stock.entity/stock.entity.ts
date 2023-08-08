import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Almacen } from '../../almacen/almacen.entity/almacen.entity';
import { Articulos } from 'src/articulos/articulos.entity/articulos.entity';

@Index('idAlm_idx', ['idAlm'], {})
@Entity('stock', { schema: 'carniceriaSIC' })
export class Stock {
  @Column('int', { primary: true, name: 'idAlm' })
  idAlm: number;

  @Column('int', { primary: true, name: 'idArt' })
  idArt: number;

  @Column('int', { name: 'stock' })
  stock: number;

  @ManyToOne(() => Almacen, (almacen) => almacen.stocks, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'idAlm', referencedColumnName: 'idAlm' }])
  idAlm2: Almacen;

  @OneToOne(() => Articulos, (articulo) => articulo.idArt, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'idArt', referencedColumnName: 'idArt' }])
  articulo: Articulos;
}
