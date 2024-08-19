import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/abstractRepository/abstract.repository';
import { UserRole } from './schema/user-role.schema';

@Injectable()
export class UserRoleRepository extends AbstractRepository<UserRole> {
  constructor(@InjectModel(UserRole.name) userRoleModel: Model<UserRole>) {
    super(userRoleModel);
  }
}
