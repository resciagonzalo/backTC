import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRole } from './user-role.entity/user-role.entity';

@Controller('user-role')
export class UserRoleController {
  constructor(private service: UserRoleService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.get(params.id);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  create(@Body() userRole: UserRole) {
    return this.service.create(userRole);
  }

  @Put()
  update(@Body() userRole: UserRole) {
    return this.service.update(userRole);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.delete(params.id);
  }
}
