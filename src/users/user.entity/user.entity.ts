import { UserRole } from 'src/user-role/user-role.entity/user-role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @Column('int', { name: 'nroCliente' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  fullName: string;

  @Column('date')
  birthday: Date;

  @Column()
  isActive: boolean;

  @OneToOne(() => UserRole, (role) => role.id, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'idRole', referencedColumnName: 'id' }])
  idRole: UserRole;
}
