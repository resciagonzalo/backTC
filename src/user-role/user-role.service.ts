import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './User-Role.entity/User-Role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async getAll(): Promise<UserRole[]> {
    return await this.userRoleRepository.find();
  }

  async get(_id: number): Promise<UserRole[]> {
    return await this.userRoleRepository.find({
      where: [{ id: _id }],
    });
  }

  async create(UserRole: UserRole) {
    this.userRoleRepository.insert(UserRole);
  }

  async update(UserRole: UserRole) {
    this.userRoleRepository.save(UserRole);
  }

  async delete(UserRole: UserRole) {
    this.userRoleRepository.delete(UserRole);
  }
}
