import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/abstractRepository/abstract.repository';
import { Role } from './schema/role.schema';

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
  constructor(@InjectModel(Role.name) roleModel: Model<Role>) {
    super(roleModel);
  }
}
